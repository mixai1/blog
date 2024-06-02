import { HttpBackend, HttpErrorResponse, HttpEvent, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

import { AppVariablesHelper } from '@shared/helpers/app-variables.helper';
import { FileHelper } from '@shared/file-upload/helpers/file.helper';

import { BridgePlugin } from '@plugins/bridge.plugin';

import { MobileRequest } from './http-mobile.request';

const BASE_64_MARK = ';base64,';
const XSSI_PREFIX = /^\)\]\}',?\n/;

interface MobileResponse {
    status: number;
    statusText: string;
    completed: boolean;
    headers: string | HttpHeaders;
    contentType: string;
    data: string;
}

@Injectable()
export class HttpCustomBackend implements HttpBackend {
    constructor(private bridge: BridgePlugin) {}

    handle(httpRequest: HttpRequest<any>): Observable<HttpEvent<any>> {
        return new Observable((observer: Observer<HttpEvent<any>>) => {
            const request: MobileRequest = new MobileRequest(httpRequest);
            if (request.method) {
                request['apiMethod'] = request.method.toUpperCase();
            }

            if (!request.headers['Accept']) {
                request.headers['Accept'] = 'application/json, text/plain, */*';
            }

            if (request.headers['Content-Type']) {
                const detectedType = httpRequest.detectContentTypeHeader();
                if (detectedType !== null) {
                    request.headers['Content-Type'] = detectedType;
                }
            }

            request.headers['NativeApp'] = 'true';

            this.checkRequestOnFormFile(observer, request);
        });
    }

    private networkCall(observer: Observer<HttpEvent<any>>, request: MobileRequest): void {
        const processResponse = (response: MobileResponse, error: { data: any }) => {
            if (error != null) {
                const errorResponse: Partial<MobileResponse> = Object.assign({}, error.data);
                observer.error(
                    this.error(
                        request,
                        errorResponse.data,
                        errorResponse.headers as HttpHeaders,
                        errorResponse.status,
                        errorResponse.statusText
                    )
                );
                return;
            }

            if (!response) {
                observer.complete();
                return;
            }

            let status: number = response.status;
            const statusText: string = response.statusText || 'OK';
            const completed: boolean = response.completed;
            const headers: HttpHeaders = new HttpHeaders(
                JSON.parse(response.headers as string) as { [name: string]: string | number | (string | number)[] }
            );

            const body: string = this.prepareBody(status, response, request.responseType);
            if (status === 0) {
                status = body ? 200 : 0;
            }
            const ok = status >= 200 && status < 300;
            if (ok) {
                observer.next(this.success(request, body, headers, status, statusText));
            } else {
                observer.error(this.error(request, body, headers, status, statusText));
            }

            if (completed) {
                observer.complete();
            }
        };

        this.bridge.api(request, processResponse).catch(error => {
            const errorResponse: Partial<MobileResponse> = Object.assign({}, error);
            observer.error(
                this.error(
                    request,
                    errorResponse.data,
                    errorResponse.headers as HttpHeaders,
                    errorResponse.status,
                    errorResponse.statusText
                )
            );
            observer.complete();
        });
    }

    private prepareBody(status: number, response: MobileResponse, responseType: any): any {
        let body: string | Promise<Blob> = null;

        if (status !== 204 && response.data) {
            body = response.data;
            if (AppVariablesHelper.isAndroid && responseType === 'blob' && response.contentType) {
                body = FileHelper.base64toBlob(body, response.contentType);
            } else if (typeof body === 'string') {
                body = body.replace(XSSI_PREFIX, '');
                body = this.parseJson(body);
            }
        }

        return body;
    }

    private error(request: MobileRequest, error: string, headers: HttpHeaders, status: number, statusText: string): HttpErrorResponse {
        return new HttpErrorResponse({
            error: error,
            headers: headers,
            status: status,
            statusText: statusText,
            url: request.url
        });
    }

    private success(request: MobileRequest, body: any, headers: HttpHeaders, status: number, statusText: string): HttpResponse<any> {
        return new HttpResponse<any>({
            body: body,
            headers: headers,
            status: status,
            statusText: statusText,
            url: request.url
        });
    }

    private checkRequestOnFormFile(observer: Observer<HttpEvent<any>>, request: MobileRequest) {
        if (
            request.headers['isFormDataUpload'] &&
            request.headers['dataModel'] === 'PostFileModel' &&
            request.body.tempPath === undefined
        ) {
            this.updateMobilePostModel(request.body.file as Blob)
                .then(base64ByBlob => {
                    request.body.file = base64ByBlob;
                    this.networkCall(observer, request);
                })
                .catch(err => {
                    observer.error(this.error(request, 'Can not convert BLOB to base64: ' + err, err.headers as HttpHeaders, 500, 'Error'));
                });
        } else {
            this.networkCall(observer, request);
        }
    }

    private updateMobilePostModel(fileBlob: Blob): Promise<any> {
        return new Promise((resolve, reject) => {
            const reader = FileHelper.getFileReader();
            reader.onloadend = () => {
                resolve(reader.result.slice((reader.result as string).indexOf(BASE_64_MARK) + BASE_64_MARK.length));
            };
            reader.onerror = () => reject(reader.error.message);
            reader.readAsDataURL(fileBlob);
        });
    }

    private parseJson(content: string): any {
        if (!AppVariablesHelper.isAndroid) return content;
        try {
            return JSON.parse(content);
        } catch (error) {
            return content;
        }
    }
}

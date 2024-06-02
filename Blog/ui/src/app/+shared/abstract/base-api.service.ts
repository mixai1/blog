import { catchError, finalize, map, share } from 'rxjs/operators';
import { Directive } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { HttpCustomClient } from '@shared/http-custom/http-custom.client';

@Directive()
export abstract class BaseApiService {
    protected apiRelativePath = '/api/';

    private _inFlight: any = {};

    constructor(protected http: HttpCustomClient, protected toastService: ToastrService) {}

    protected httpGet<T>(url: string): Observable<T> {
        if (this._inFlight[url.toLowerCase()]) {
            return this._inFlight[url.toLowerCase()];
        }
        const request: Observable<any> = this.http
            .get<T>(`${this.apiRelativePath}${url}`, { observe: 'response', headers: this.getHeaders() })
            .pipe(
                map((res: HttpResponse<T>) => res.body),
                share(),
                catchError((error: HttpErrorResponse) => this.handleError(error)),
                finalize(() => this.clearInFlight(url))
            );
        this._inFlight[url.toLowerCase()] = request;

        return request;
    }

    protected httpGetBlob(url: string): Observable<Blob> {
        if (this._inFlight[url.toLowerCase()]) {
            return this._inFlight[url.toLowerCase()];
        }
        return this.http.get(`${this.apiRelativePath}${url}`, {
            responseType: 'blob',
            headers: this.getHeaders()
        });
    }

    protected httpPost<T>(url: string, data: any = null): Observable<T> {
        const request: Observable<any> = this.http
            .post<T>(this.apiRelativePath + url, data, { observe: 'response', headers: this.getHeaders() })
            .pipe(
                map((res: HttpResponse<T>) => res.body),
                share(),
                catchError((error: HttpErrorResponse) => this.handleError(error))
            );

        return request;
    }

    protected httpPut<T>(url: string, data: any = null): Observable<T> {
        const request: Observable<any> = this.http
            .put<T>(this.apiRelativePath + url, data, { observe: 'response', headers: this.getHeaders() })
            .pipe(
                map((res: HttpResponse<T>) => res.body),
                share(),
                catchError((error: HttpErrorResponse) => this.handleError(error))
            );

        return request;
    }

    protected httpDelete<T>(url: string): Observable<T> {
        const request: Observable<any> = this.http
            .delete<T>(`${this.apiRelativePath}${url}`, { observe: 'response', headers: this.getHeaders() })
            .pipe(
                map((res: HttpResponse<T>) => res.body),
                share(),
                catchError((error: HttpErrorResponse) => this.handleError(error))
            );

        return request;
    }

    public handleError(response: HttpErrorResponse): Observable<HttpErrorResponse> {
        let message = typeof response.error === 'string' ? response.error : response.message;
        message = message || response.statusText || 'Server error';
        this.toastService.error(message);
        return throwError(() => response);
    }

    protected getHeaders(headers: HttpHeaders | null = null): HttpHeaders {
        if (!headers) {
            headers = new HttpHeaders();
        }
        return headers.set('require-user', 'true');
    }

    private clearInFlight(url: string): void {
        if (this._inFlight[url.toLowerCase()]) {
            delete this._inFlight[url.toLowerCase()];
        }
    }
}

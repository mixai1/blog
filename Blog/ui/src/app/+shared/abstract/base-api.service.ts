import { Directive } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { map, share } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';

import { environment } from '../../../environments/environment';
import { SetError } from '../toast/store/toast.actions';

@Directive()
export abstract class BaseApiService {
    protected apiRelativePath = '/api/';

    protected errorDispatchEnabled = true;

    private _inFlight: any = {};

    constructor(
        protected http: HttpClient,
        protected store: Store
    ) { }

    protected httpGet<T>(url: string, ctor: (value: any) => T, options?: HttpHeaders): Observable<any> {
        if (this._inFlight[url.toLowerCase()]) {
            return this._inFlight[url.toLowerCase()];
        }
        const request: Observable<any> = this.http
            .get<T>(this.apiRelativePath + url, {
                observe: 'response',
                headers: options
            })
            .pipe(
                map((res: HttpResponse<T>) => this.mapType<T>(res, ctor)),
                share()
            );
        this._inFlight[url.toLowerCase()] = request;
        request.subscribe({
            error: (error: HttpErrorResponse) => this.handleError(error),
            complete: () => this.clearInFlight(url)
        });

        return request;
    }

    protected httpGetBlob(url: string): Observable<Blob> {
        return this.http.get(this.apiRelativePath + url, {
            responseType: 'blob'
        });
    }

    protected httpPostBlob(url: string, data: any = null): Observable<Blob> {
        return this.http.post(this.apiRelativePath + url, data, {
            responseType: 'blob'
        });
    }

    protected httpPost<T>(url: string, ctor: (value: any) => T, data: any, options?: HttpHeaders): Observable<any> {
        const request: Observable<any> = this.http
            .post(this.apiRelativePath + url, data, {
                observe: 'response',
                headers: options
            })
            .pipe(
                map(res => this.mapType<T>(res as HttpResponse<T>, ctor)),
                share()
            );
        request.subscribe({ error: (error: HttpErrorResponse) => this.handleError(error) });

        return request;
    }

    protected httpPut<T>(url: string, ctor: (value: any) => T, data: any = null, options: HttpHeaders): Observable<any> {
        const request: Observable<any> = this.http
            .put(this.apiRelativePath + url, data, {
                observe: 'response',
                headers: options
            })
            .pipe(
                map(res => this.mapType<T>(res as HttpResponse<T>, ctor)),
                share()
            );

        request.subscribe({ error: (error: HttpErrorResponse) => this.handleError(error) });

        return request;
    }

    protected httpDelete<T>(url: string, id: number, ctor: (value: any) => T, options: HttpHeaders): Observable<any> {
        const request: Observable<any> = this.http
            .delete(this.apiRelativePath + url + '/' + id, {
                observe: 'response',
                headers: options
            })
            .pipe(
                map(res => this.mapType<T>(res as HttpResponse<T>, ctor)),
                share()
            );

        request.subscribe({ error: (error: HttpErrorResponse) => this.handleError(error) });

        return request;
    }

    private clearInFlight(url: string): void {
        if (this._inFlight[url.toLowerCase()]) {
            delete this._inFlight[url.toLowerCase()];
        }
    }

    public handleError(response: HttpErrorResponse): void {
        if (!environment.production) {
            console.error(response.error || response.status ? `${response.status} - ${response.statusText}` : 'Server error');
        }
        if (response && this.errorDispatchEnabled) {
            let message: string = response.error || response.statusText || 'Server error';
            const paths = window.location.hash.split('/').filter(x => x && x !== '#');
            switch (response.status) {
                case 0: // Possible CORS error
                    if (paths.length) {
                        localStorage['path'] = paths;
                    }
                    window.location.reload();
                    return;
                case 404:
                    message = 'Object not found';
                    break;
                default:
                    break;
            }
            this.store.dispatch(new SetError(message));
        }
    }

    protected mapType<T>(res: HttpResponse<T>, ctor: (value: any) => T): any {
        const val: any = res.status === 204 ? null : res.body;
        if (val === null) {
            return null;
        }

        if (val === '[]') {
            return [];
        }
        if (Array.isArray(val)) {
            return val.map(x => ctor(x));
        }
        return ctor(val);
    }
}

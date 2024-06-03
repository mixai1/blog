import { catchError } from 'rxjs/operators';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Store } from '@ngxs/store';

import { RefreshToken } from '@shared/auth/store/auth.actions';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private store: Store) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError(error => {
                if (error.status === 401) {
                    return this.store.dispatch(new RefreshToken());
                }

                return of(null)
            })
        );
    }
}

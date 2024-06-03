import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Navigate } from '@ngxs/router-plugin';
import { Observable, catchError, tap } from 'rxjs';

import { APP_ROUTES } from '@shared/constants/app-routes.const';
import { SetError } from '@shared/toast';

import { JwtTokenModel } from '@models/jwt-token.model';
import { UserModel } from '@models/user-model';

import { AuthApiService } from '../services/auth-api.service';
import { AuthStateModel } from './auth.model';
import { Login, Logout, RefreshToken, Register } from './auth.actions';

@State<AuthStateModel>({
    name: 'authState',
    defaults: {
        currentUser: null
    }
})
@Injectable()
export class AuthState {
    @Selector()
    static currentUser(state: AuthStateModel): UserModel | null {
        return state.currentUser;
    }

    constructor(
        private apiService: AuthApiService,
        private jwtHelperService: JwtHelperService
    ) { }

    @Action(Login)
    onLogin(context: StateContext<AuthStateModel>, { payload }: Login): Observable<any> {
        return this.apiService.login(payload).pipe(
            tap(tokens => {
                this.setTokens(tokens, context);
            }),
            catchError(error => {
                return context.dispatch(new SetError(error?.message));
            })
        );
    }

    @Action(Logout)
    onLogout({ dispatch, patchState }: StateContext<AuthStateModel>): Observable<any> {
        return this.apiService.logout().pipe(
            tap(() => {
                patchState({ currentUser: null });
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
            }),
            catchError(error => {
                return dispatch(new SetError(error?.message));
            })
        );
    }

    @Action(Register)
    onRegister(context: StateContext<AuthStateModel>, { payload }: Register): Observable<any> {
        return this.apiService.register(payload).pipe(
            tap(tokens => {
                this.setTokens(tokens, context);
            }),
            catchError(error => {
                return context.dispatch(new SetError(error?.message));
            })
        );
    }

    @Action(RefreshToken)
    onRefreshToken(context: StateContext<AuthStateModel>): Observable<any>{
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');
        if (!accessToken && !refreshToken) {
            context.dispatch([new SetError('Unauthorized'), new Navigate([APP_ROUTES.Login])])
        }

        return this.apiService.RefreshToken(new JwtTokenModel({ accessToken: accessToken!, refreshToken: refreshToken! })).pipe(
            tap(tokens => {
                this.setTokens(tokens, context);
            }),
            catchError(error => {
                return context.dispatch([new SetError(error?.message), new Navigate([APP_ROUTES.Login])]);
            })
        );
    }

    private setTokens(tokens: JwtTokenModel, context: StateContext<AuthStateModel>): void {
        localStorage.setItem('accessToken', tokens.accessToken);
        localStorage.setItem('refreshToken', tokens.refreshToken);
        context.patchState({ currentUser: this.jwtHelperService.decodeToken<UserModel>(tokens.accessToken) });
        context.dispatch(new Navigate([APP_ROUTES.Blog]));
    }
}

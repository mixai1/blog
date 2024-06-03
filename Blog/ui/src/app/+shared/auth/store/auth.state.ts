import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, catchError, tap } from 'rxjs';

import { SetError } from '@shared/toast';

import { UserModel } from '@models/user-model';

import { AuthApiService } from '../services/auth-api.service';
import { AuthStateModel } from './auth.model';
import { Login, Logout, Register } from './auth.actions';

@State<AuthStateModel>({
    name: 'authState',
    defaults: {
        currentUser: null
    }
})
@Injectable()
export class AuthState {
    //private jwtHelperService = new JwtHelperService();

    @Selector()
    static currentUser(state: AuthStateModel): UserModel | null {
        return state.currentUser;
    }

    constructor(
        private apiService: AuthApiService,
        private jwtHelperService: JwtHelperService
    ) { }

    @Action(Login)
    onLogin({ dispatch, patchState }: StateContext<AuthStateModel>, { payload }: Login): Observable<any> {
        return this.apiService.login(payload).pipe(
            tap(tokes => {
                console.log(this.jwtHelperService.decodeToken<UserModel>(tokes.accessToken))
                patchState({ currentUser: this.jwtHelperService.decodeToken<UserModel>(tokes.accessToken) });
                localStorage.setItem('accessToken', tokes.accessToken);
                localStorage.setItem('refreshToken', tokes.refreshToken);
            }),
            catchError(error => {
                return dispatch(new SetError(error?.message));
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
    onRegister({ dispatch, patchState }: StateContext<AuthStateModel>, { payload }: Register): Observable<any> {
        return this.apiService.register(payload).pipe(
            tap(tokes => {
                patchState({ currentUser: this.jwtHelperService.decodeToken<UserModel>(tokes.accessToken) });
                localStorage.setItem('accessToken', tokes.accessToken);
                localStorage.setItem('refreshToken', tokes.refreshToken);
            }),
            catchError(error => {
                return dispatch(new SetError(error?.message));
            })
        );
    }
}

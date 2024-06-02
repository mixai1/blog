import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { Navigate } from '@ngxs/router-plugin';
import { Observable } from 'rxjs';
import { patch } from '@ngxs/store/operators';
import { tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

import { APP_ROUTES } from '@shared/constants/app-routes.const';
import { EXPERTISE_LEVELS } from '@shared/constants/expertise-level.const';
import { LANGUAGES } from '@shared/constants/languages.const';

import { NameValueModel } from '@models/name-value.model';
import { UserModel } from '@models/generated/user.model';

import { AuthApiService } from '../services/auth-api.service';
import { AuthStateModel } from './auth.model';
import {
    ChangePassword,
    DeleteProfile,
    LoadCurrentUser,
    Login,
    Logout,
    RegisterUser,
    SetLanguage,
    UpdateExpertise,
    UpdateProfile
} from './auth.actions';

@State<AuthStateModel>({
    name: 'authState',
    defaults: {
        currentUser: null,
        language: LANGUAGES[0],
        expertise: EXPERTISE_LEVELS[0]
    }
})
@Injectable()
export class AuthState {
    @Selector()
    static currentUser(state: AuthStateModel): UserModel | null {
        return state.currentUser;
    }

    @Selector()
    static initials(state: AuthStateModel): string | undefined {
        return state.currentUser?.initials;
    }

    @Selector()
    static fullName(state: AuthStateModel): string | undefined {
        return state.currentUser?.fullName;
    }

    @Selector()
    static language(state: AuthStateModel): NameValueModel {
        return state.language;
    }

    @Selector()
    static expertise(state: AuthStateModel): NameValueModel | null {
        return state.expertise;
    }

    private readonly localStorageKey: string = 'portal_language';

    constructor(private apiService: AuthApiService, private toastService: ToastrService, private translate: TranslateService) {}

    ngxsOnInit({ dispatch }: StateContext<AuthStateModel>): void {
        dispatch(new SetLanguage(LANGUAGES.find(x => x.value === localStorage.getItem(this.localStorageKey)) || LANGUAGES[0]));
    }

    @Action(RegisterUser)
    onRegisterUser({ patchState }: StateContext<AuthStateModel>, { payload }: RegisterUser): Observable<UserModel> {
        return this.apiService.register(payload).pipe(
            tap(currentUser => {
                patchState({ currentUser, expertise: this.setExpertise(currentUser.expertiseLevel) });
                this.toastService.success(this.translate.instant('TOAST.REGISTER_USER_SUCCESS') as string);
            })
        );
    }

    @Action(Login)
    onLogin({ dispatch, patchState }: StateContext<AuthStateModel>, { payload }: Login): Observable<UserModel> {
        return this.apiService.login(payload).pipe(
            tap(currentUser => {
                patchState({ currentUser, expertise: this.setExpertise(currentUser.expertiseLevel) });
                dispatch([new Navigate([currentUser.isAdmin ? APP_ROUTES.Admin : APP_ROUTES.AssistantChat])]);
            })
        );
    }

    @Action(Logout)
    onLogout({ dispatch, patchState }: StateContext<AuthStateModel>): Observable<null> {
        return this.apiService.logout().pipe(
            tap(() => {
                patchState({ currentUser: null });
                dispatch([new Navigate([APP_ROUTES.Login])]);
            })
        );
    }

    @Action(DeleteProfile)
    onDeleteProfile({ dispatch, patchState }: StateContext<AuthStateModel>): Observable<null> {
        return this.apiService.deleteProfile().pipe(
            tap(() => {
                patchState({ currentUser: null });
                dispatch([new Navigate([APP_ROUTES.Login])]);
                this.toastService.show(this.translate.instant('TOAST.DELETE_PROFILE_SUCCESS') as string);
            })
        );
    }

    @Action(LoadCurrentUser)
    onLoadCurrentUser({ patchState }: StateContext<AuthStateModel>): Observable<UserModel | null> {
        return this.apiService
            .get()
            .pipe(
                tap(currentUser =>
                    patchState({ currentUser, expertise: currentUser ? this.setExpertise(currentUser?.expertiseLevel) : null })
                )
            );
    }

    @Action(UpdateProfile)
    onUpdateProfile({ patchState }: StateContext<AuthStateModel>, { payload }: UpdateProfile): Observable<UserModel> {
        return this.apiService.updateProfile(payload).pipe(
            tap(currentUser => {
                patchState({ currentUser, expertise: this.setExpertise(currentUser.expertiseLevel) });
                this.toastService.success(this.translate.instant('TOAST.UPDATE_SUCCESS') as string);
            })
        );
    }

    @Action(ChangePassword)
    onChangePassword(_: StateContext<AuthStateModel>, { payload }: ChangePassword): Observable<null> {
        return this.apiService
            .changePassword(payload)
            .pipe(tap(() => this.toastService.success(this.translate.instant('TOAST.UPDATE_SUCCESS') as string)));
    }

    @Action(SetLanguage)
    onSetLanguage({ patchState }: StateContext<AuthStateModel>, { payload }: SetLanguage): void {
        patchState({ language: payload });
        localStorage.setItem(this.localStorageKey, payload?.value as string);
        this.translate.use(payload.value as string);
    }

    @Action(UpdateExpertise)
    onUpdateExpertise({ setState }: StateContext<AuthStateModel>, { payload }: UpdateExpertise): Observable<UserModel> {
        return this.apiService.updateExpertiseLevel(payload.value as number).pipe(
            tap(currentUser => {
                setState(patch({ currentUser, expertise: payload }));
            })
        );
    }

    private setExpertise(level: number): NameValueModel | null {
        return EXPERTISE_LEVELS.find(x => x.value === level) || null;
    }
}

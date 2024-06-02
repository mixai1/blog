import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ChangePasswordModel } from '@models/generated/change-password.model';
import { ChangeProfileModel } from '@models/generated/change-profile.model';
import { LoginModel } from '@models/generated/login.model';
import { RegistrationModel } from '@models/generated/registration.model';
import { UserModel } from '@models/generated/user.model';

import { BaseApiService } from '../../abstract/base-api.service';

@Injectable()
export class AuthApiService extends BaseApiService {
    public register(model: RegistrationModel): Observable<UserModel> {
        return this.httpPost('Registration', model);
    }

    public login(model: LoginModel): Observable<UserModel> {
        return this.httpPost('Authorization', model);
    }

    public logout(): Observable<null> {
        return this.httpGet('Authorization/Logout');
    }

    public get(): Observable<UserModel | null> {
        return this.httpGet('Authorization');
    }

    public updateProfile(model: ChangeProfileModel): Observable<UserModel> {
        return this.httpPut('UserProfile', model);
    }

    public changePassword(model: ChangePasswordModel): Observable<null> {
        return this.httpPut('UserProfile/ChangePassword', model);
    }

    public deleteProfile(): Observable<null> {
        return this.httpDelete('UserProfile');
    }

    public updateExpertiseLevel(expertiseLevel: number): Observable<UserModel> {
        return this.httpPut(`UserProfile/${expertiseLevel}`);
    }
}

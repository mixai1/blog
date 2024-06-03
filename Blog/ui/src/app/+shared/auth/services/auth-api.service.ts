import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { UserLoginModel } from '@models/user-login.model';
import { JwtTokenModel } from '@models/jwt-token.model';

import { BaseApiService } from '../../abstract/base-api.service';
import { RegistrationModel } from '@models/registration.model';

@Injectable()
export class AuthApiService extends BaseApiService {
    protected override apiRelativePath = '/api/Authorization/'

    public register(model: RegistrationModel): Observable<JwtTokenModel> {
        return this.httpPost('Register', x => x, model);
    }

    public login(model: UserLoginModel): Observable<JwtTokenModel> {
        return this.httpPost('Login', x => x, model);
    }

    public RefreshToken(model: JwtTokenModel): Observable<JwtTokenModel> {
        return this.httpPost('RefreshToken', x => x, model);
    }

    public logout(): Observable<null> {
        return this.httpGet('Logout', x => x);
    }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { UserModel } from '@models/user-model';

import { BaseApiService } from '../../abstract/base-api.service';
import { RegistrationModel } from '@models/registration.model';

@Injectable()
export class AuthApiService extends BaseApiService {
    public register(model: RegistrationModel): Observable<UserModel> {
        return this.httpPost('Registration', model);
    }

    public login(model: any): Observable<UserModel> {
        return this.httpPost('Authorization', model);
    }

    public logout(): Observable<null> {
        return this.httpGet('Authorization/Logout');
    }
}

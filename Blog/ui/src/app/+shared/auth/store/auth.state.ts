import { Selector, State } from '@ngxs/store';
import { Injectable } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

import { UserModel } from '@models/user-model';

import { AuthApiService } from '../services/auth-api.service';
import { AuthStateModel } from './auth.model';

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

    constructor(private apiService: AuthApiService, private toastService: ToastrService) {} 
}

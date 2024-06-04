import { Selector } from '@ngxs/store';
import { AuthState } from './auth.state';

import { USER_ROLES } from '@shared/constants/roles.const';

import { UserModel } from '@models/user-model';

export class AuthQuery {
    @Selector([AuthState.currentUser])
    static isAuthenticated(currentUser: UserModel): boolean {
        return !!currentUser;
    }

    @Selector([AuthState.currentUser])
    static isAdminRole(currentUser: UserModel): boolean {
        return !!currentUser && currentUser.roles.includes(USER_ROLES.Admin);
    }

    @Selector([AuthState.currentUser])
    static isUserRole(currentUser: UserModel): boolean {
        return !!currentUser && currentUser.roles.includes(USER_ROLES.User);
    }
}

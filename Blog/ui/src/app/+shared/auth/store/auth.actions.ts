import { RegistrationModel } from '@models/registration.model';
import { UserLoginModel } from '@models/user-login.model';

export class Register {
    static readonly type = '[Auth] Register User';
    constructor(public payload: RegistrationModel) {}
}

export class Login {
    static readonly type = '[Auth] Login User';
    constructor(public payload: UserLoginModel) {}
}

export class Logout {
    static readonly type = '[Auth] Logout User';
}

export class RefreshToken {
    static readonly type = '[Auth] Refresh token'
}

export class LoadCurrentUser {
    static readonly type = '[Auth] Load current user';
}

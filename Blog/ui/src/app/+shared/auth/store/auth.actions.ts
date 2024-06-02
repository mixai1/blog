import { RegistrationModel } from '@models/registration.model';
import { UserLoginModel } from '@models/userLogin.model';

export class RegisterUser {
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

export class LoadCurrentUser {
    static readonly type = '[Auth] Load current user';
}

export class Unauthorized {
    static readonly type = '[Auth] Unauthorized';
}

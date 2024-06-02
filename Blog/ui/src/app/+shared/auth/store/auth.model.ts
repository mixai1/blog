import { UserModel } from "@models/user-model";

export interface AuthStateModel {
    currentUser: UserModel | null;
}

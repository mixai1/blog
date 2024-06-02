import { NameValueModel } from '@models/name-value.model';
import { UserModel } from '@models/generated/user.model';

export interface AuthStateModel {
    currentUser: UserModel | null;
    language: NameValueModel;
    expertise: NameValueModel | null;
}

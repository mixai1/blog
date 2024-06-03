export class UserLoginModel {
    public email!: string;
    public password!: string;
    public constructor(
        fields?: Partial<UserLoginModel>) {

        if (fields) {


            Object.assign(this, fields);
        }
    }
}

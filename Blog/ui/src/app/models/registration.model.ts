export class RegistrationModel {
    public email!: string;
    public firstName!: string;
    public lastName!: string;
    public password!: string;

    public constructor(
        fields?: Partial<RegistrationModel>) {

        if (fields) {


            Object.assign(this, fields);
        }
    }
}

export class UserModel {
    id!: number;
    roles!: string[];
    userName!: string;
    email!: string;
    public constructor(
        fields?: Partial<UserModel>) {

        if (fields) {

            Object.assign(this, fields);
        }
    }
}

export class JwtTokenModel {
    accessToken!: string;
    refreshToken!: string;

    public constructor(
        fields?: Partial<JwtTokenModel>) {

        if (fields) {


            Object.assign(this, fields);
        }
    }
}

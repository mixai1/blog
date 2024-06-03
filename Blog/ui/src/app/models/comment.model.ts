export class CommentModel {
    public id!: number;
    public message!: string;
    public createTime!: number;

    public constructor(
        fields?: Partial<CommentModel>) {

        if (fields) {


            Object.assign(this, fields);
        }
    }
}
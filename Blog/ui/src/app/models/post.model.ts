import { CommentModel } from "./comment.model";
import { PostTypeModel } from "./post-type.model";

export class PostModel {
    public id!: number;
    public photo!: string;
    public header!: string;
    public body!: string;

    public postType!: PostTypeModel;

    public comments!: CommentModel[]

    public constructor(
        fields?: Partial<PostModel>) {

        if (fields) {


            Object.assign(this, fields);
        }
    }
}
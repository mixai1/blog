import { PostTypeEnum } from "@shared/enums/post-type.enum";
import { CommentModel } from "./comment.model";

export class PostListModel {
    public id!: number;
    public photo!: string;
    public header!: string;
    public body!: string;

    public Type!: PostTypeEnum;

    public comments!: CommentModel[]

    public constructor(
        fields?: Partial<PostListModel>) {

        if (fields) {


            Object.assign(this, fields);
        }
    }
}

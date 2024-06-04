import { PostTypeEnum } from '@shared/enums/post-type.enum';

export class PostModel {
    public id!: number;
    public photo!: string;
    public header!: string;
    public body!: string;
    public createTime!: number;
    public type!: PostTypeEnum;
    public userId?: number;

    public constructor(
        fields?: Partial<PostModel>) {

        if (fields) {

            Object.assign(this, fields);
        }
    }
} 

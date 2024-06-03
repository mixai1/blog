import { PostTypeEnum } from '@shared/enums/post-type.enum';

export class PostTypeModel {
    public id!: number;
    public type!: PostTypeEnum;

    public content!: string;

    public constructor(
        fields?: Partial<PostTypeModel>) {

        if (fields) {

            Object.assign(this, fields);
        }
    }

    public getType<T>(content: string): T {
        return JSON.parse(content)
    }
} 
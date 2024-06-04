import { PostModel } from '@models/post.model';

export class GetPosts {
    static readonly type = '[Blog] Get posts';
}

export class AddPost {
    static readonly type = '[Blog] Add post';
    constructor(public payload: PostModel) {}
}

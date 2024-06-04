import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Store } from '@ngxs/store';

import { GetPosts } from '../store/blog.actions';
import { map } from 'rxjs';
import { PostListModel } from '@models/post-list.model';

export const PostResolver: ResolveFn<PostListModel[] | null> = () => {
    const store = inject(Store);
    return store.dispatch(new GetPosts()).pipe(map(x => x.blogState.posts));
};

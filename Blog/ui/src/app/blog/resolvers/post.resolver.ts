import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Store } from '@ngxs/store';

import { GetPosts } from '../store/blog.actions';
import { map } from 'rxjs';
import { PostModel } from '@models/post.model';

export const PostResolver: ResolveFn<PostModel | null> = () => {
    const store = inject(Store);
    return store.dispatch(new GetPosts()).pipe(map(x => x.authState.currentUser));
};
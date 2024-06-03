import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

import { PostModel } from '@models/post.model';

import { BlogStateModel } from './blog.model';
import { GetPosts } from './blog.actions';
import { PostApiService } from '../services/post-api.service';

@State<BlogStateModel>({
    name: 'blogState',
    defaults: {
        posts: []
    }
})
@Injectable()
export class BlogState {
    @Selector()
    static posts(state: BlogStateModel): PostModel[] {
        return state.posts;
    }

    constructor(private apiService: PostApiService) {}

    @Action(GetPosts)
    onGetPosts({ patchState }: StateContext<BlogStateModel>): Observable<any> {
        return this.apiService.getPosts().pipe(
            tap(posts => {
                patchState({ posts })
            })
        );
    }
}
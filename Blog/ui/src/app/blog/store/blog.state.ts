import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { Navigate } from '@ngxs/router-plugin';
import { Observable, tap } from 'rxjs';
import { insertItem, patch } from '@ngxs/store/operators';

import { APP_ROUTES } from '@shared/constants/app-routes.const';

import { PostListModel } from '@models/post-list.model';

import { AddPost, GetPosts } from './blog.actions';
import { BlogStateModel } from './blog.model';
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
    static posts(state: BlogStateModel): PostListModel[] {
        return state.posts;
    }

    constructor(private apiService: PostApiService) { }

    @Action(GetPosts)
    onGetPosts({ patchState }: StateContext<BlogStateModel>): Observable<PostListModel[]> {
        return this.apiService.getPosts().pipe(
            tap(posts => {
                patchState({ posts })
            })
        );
    }

    @Action(AddPost)
    onAddPost({ setState, dispatch }: StateContext<BlogStateModel>, { payload }: AddPost): Observable<PostListModel> {
        return this.apiService.addPost(payload).pipe(
            tap(post => {
                setState(
                    patch({
                        posts: insertItem<PostListModel>(post)
                    })
                );
                dispatch(new Navigate([APP_ROUTES.Blog]));
            })
        )
    }
}

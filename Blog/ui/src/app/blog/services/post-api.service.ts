import { Injectable } from '@angular/core';

import { BaseApiService } from '@shared/abstract/base-api.service';

import { PostListModel } from '@models/post-list.model';
import { PostModel } from '@models/post.model';

import { Observable } from 'rxjs';

@Injectable()
export class PostApiService extends BaseApiService {
    protected override apiRelativePath = '/api/Post/'

    public getPosts(): Observable<PostListModel[]> {
        return this.httpGet('', x => x);
    }

    public addPost(model: PostModel): Observable<PostListModel> {
        return this.httpPost('', x => x, model);
    }
}

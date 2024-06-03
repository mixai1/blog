import { Injectable } from '@angular/core';

import { BaseApiService } from '@shared/abstract/base-api.service';
import { Observable } from 'rxjs';

@Injectable()
export class PostApiService extends BaseApiService {
    protected override apiRelativePath = '/api/post/'

    public getPosts(): Observable<any> {
        return this.httpGet('', x => x);
    }
}

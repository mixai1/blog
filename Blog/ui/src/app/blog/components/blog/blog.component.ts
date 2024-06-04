import { AfterViewInit, ChangeDetectionStrategy, Component, ViewChild, ViewContainerRef } from '@angular/core';
import { BlogState } from '../../store/blog.state';
import { PostApiService } from '../../services/post-api.service';
import { Store } from '@ngxs/store';
import { takeUntil } from 'rxjs';

import { DestroyComponent } from '@shared/abstract/destroy.component';
import { BLOG_ROUTES } from '../../shared/constants/blog-routes.cont';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-blog',
    templateUrl: 'blog.component.html'
})
export class BlogComponent extends DestroyComponent implements AfterViewInit {
    @ViewChild('feedContainer', { read: ViewContainerRef })
    private readonly feedViewContainerRef!: ViewContainerRef;

    readonly addPostLink = [`./${BLOG_ROUTES.Add}`];

    private posts$ =  this.store.select(BlogState.posts);

    constructor(private store: Store) {
        super();
    }

    ngAfterViewInit(): void {
       this.posts$.pipe(takeUntil(this.destroy$)).subscribe(posts => {});
    }
}

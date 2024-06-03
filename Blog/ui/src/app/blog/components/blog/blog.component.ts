import { AfterViewInit, ChangeDetectionStrategy, Component, ViewChild, ViewContainerRef } from '@angular/core';
import { BlogState } from '../../store/blog.state';
import { PostApiService } from '../../services/post-api.service';
import { Store } from '@ngxs/store';
import { takeUntil } from 'rxjs';

import { DestroyComponent } from '@shared/abstract/destroy.component';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-blog',
    templateUrl: 'blog.component.html'
})
export class BlogComponent extends DestroyComponent implements AfterViewInit {
    @ViewChild('feedContainer', { read: ViewContainerRef })
    private readonly feedViewContainerRef!: ViewContainerRef;

    private posts$ =  this.store.select(BlogState.posts);

    constructor(private apiService: PostApiService, private store: Store) {
        super();
    }

    ngAfterViewInit(): void {
       this.posts$.pipe(takeUntil(this.destroy$)).subscribe(posts => {});
    }

    onClick(): void {
        this.apiService.getPosts().subscribe(x => console.log(x));
    }
}

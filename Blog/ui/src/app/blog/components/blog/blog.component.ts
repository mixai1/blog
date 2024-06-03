import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PostApiService } from '../../services/post-api.service';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-blog',
    templateUrl: 'blog.component.html'
})
export class BlogComponent {
    constructor(private apiService: PostApiService) {}
    
    onClick(): void {
        this.apiService.getPost(1).subscribe(x => console.log(x));
    }
}

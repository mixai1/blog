import { BlogComponent } from './components/blog/blog.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { ReactiveFormsModule } from '@angular/forms';

import { AddPostComponent } from './components/post/add-post/add-post.component';
import { BlogRoutingModule } from './blog-routing.module';
import { BlogState } from './store/blog.state';
import { PostApiService } from './services/post-api.service';

@NgModule({
    declarations: [BlogComponent, AddPostComponent],
    imports: [
        NgxsModule.forFeature([BlogState]),
        CommonModule,
        BlogRoutingModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        ReactiveFormsModule,
    ],
    providers: [PostApiService]
})
export class BlogModule { }

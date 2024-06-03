import { BlogComponent } from './components/blog/blog.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { BlogRoutingModule } from './blog-routing.module';
import { PostApiService } from './services/post-api.service';

@NgModule({
    declarations: [BlogComponent],
    imports: [
        CommonModule,
        BlogRoutingModule,
        MatButtonModule,
        MatFormFieldModule,
        ReactiveFormsModule,
    ],
    providers: [PostApiService]
})
export class BlogModule { }

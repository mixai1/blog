import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BlogComponent } from './components/blog/blog.component';
import { PostResolver } from './resolvers/post.resolver';
import { AddPostComponent } from './components/post/add-post/add-post.component';
import { BLOG_ROUTES } from './shared/constants/blog-routes.cont';

const routes: Routes = [
    {
        path: '',
        resolve: [PostResolver],
        component: BlogComponent,
    },
    {
        path: BLOG_ROUTES.Add,
        component: AddPostComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BlogRoutingModule { }

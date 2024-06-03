import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BlogComponent } from './components/blog/blog.component';
import { PostResolver } from './resolvers/post.resolver';

const routes: Routes = [
    {
        path: '',
        resolve: PostResolver,
        component: BlogComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BlogRoutingModule { }

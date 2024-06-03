import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { APP_ROUTES } from '@shared/constants/app-routes.const';

const routes: Routes = [
    {
        path: APP_ROUTES.Login,
        loadChildren: () => import('./login/login.module').then(x => x.LoginModule)
    },
    {
        path: APP_ROUTES.SignUp,
        loadChildren: () => import('./registration/registration.module').then(x => x.RegistrationModule)
    },
    {
        path: APP_ROUTES.Blog,
        loadChildren: () => import('./blog/blog.module').then(x => x.BlogModule)
    },
    {
        path: '**', redirectTo: APP_ROUTES.Login
    }
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}

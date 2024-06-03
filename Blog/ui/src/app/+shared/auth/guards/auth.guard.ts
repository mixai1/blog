import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { map } from 'rxjs/operators';
import { Navigate } from '@ngxs/router-plugin';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';

import { APP_ROUTES } from '@shared/constants/app-routes.const';

import { UserModel } from '@models/user.model';

import { AuthUserResolver } from '../resolvers/auth-user.resolver';

export const AuthGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const store = inject(Store);
    const resolve = AuthUserResolver(next, state) as Observable<UserModel | null>;
    return resolve.pipe(
        map(x => {
            if (!x) {
                store.dispatch(new Navigate([APP_ROUTES.Login]));
            }
            return !!x;
        })
    );
};

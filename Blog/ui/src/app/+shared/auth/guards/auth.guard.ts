import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Store } from '@ngxs/store';

import { AuthQuery } from '../store/auth.query';

export const AuthGuard: CanActivateFn = () => {
    const store = inject(Store);
    return store.select(AuthQuery.isAuthenticated);
};

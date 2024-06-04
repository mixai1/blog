import { inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { CanActivateFn } from '@angular/router';

import { AuthQuery } from '../store/auth.query';

export const AdminGuard: CanActivateFn = () => { 
    const store = inject(Store);
    return store.select(AuthQuery.isAdminRole);
}

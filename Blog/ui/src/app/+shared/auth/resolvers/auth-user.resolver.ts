import { inject } from '@angular/core';
import { map } from 'rxjs/operators';
import { of } from 'rxjs';
import { ResolveFn } from '@angular/router';
import { Store } from '@ngxs/store';

import { UserModel } from '@models/generated/user.model';

import { AuthState } from '../store/auth.state';
import { LoadCurrentUser } from '../store/auth.actions';

export const AuthUserResolver: ResolveFn<UserModel | null> = () => {
    const store = inject(Store);
    const currentUser = store.selectSnapshot(AuthState.currentUser);
    return currentUser ? of(currentUser) : store.dispatch(new LoadCurrentUser()).pipe(map(x => x.authState.currentUser));
};

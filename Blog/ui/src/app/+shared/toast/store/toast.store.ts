import { Action, State, StateContext, Store } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { SetError, SetSuccess } from './toast.actions';
import { ToastModel } from './toast.model';

@State<ToastModel>({
    name: 'toastState',
    defaults: {
        payload: null!
    }
})
@Injectable()
export class ToastState {
    constructor(protected store: Store, private toastService: ToastrService) {}

    @Action(SetSuccess)
    onSetSuccess(_: StateContext<string>, { payload }: ToastModel): void {
        this.toastService.success(payload);
    }

    @Action(SetError)
    onSetError(_: StateContext<string>, { payload }: ToastModel): void {
        this.toastService.error(payload);
    }
}

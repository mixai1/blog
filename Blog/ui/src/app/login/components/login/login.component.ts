import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';

import { APP_ROUTES } from '@shared/constants/app-routes.const';
import { Login } from '@shared/auth/store/auth.actions';

import { LoginFormInterface } from '@models/form-interfaces/login-form.interface';
import { UserLoginModel } from '@models/user-login.model';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.scss']
})
export class LoginComponent {
    readonly signUpLink = [`/${APP_ROUTES.SignUp}`];

    form = this.createForm();

    hidePassword = true;

    constructor(private fb: FormBuilder, private store: Store) {}

    onLogin(): void {
        if (this.form.invalid || this.form.pristine) {
            this.form.markAllAsTouched();
            return;
        }

        this.form.markAsPristine();
        this.store.dispatch(new Login(new UserLoginModel(this.form.getRawValue())));
    }

    private createForm(): FormGroup<LoginFormInterface> {
        return this.fb.nonNullable.group({
            email: ['', Validators.required],
            password: ['', Validators.required],
        });
    }
}

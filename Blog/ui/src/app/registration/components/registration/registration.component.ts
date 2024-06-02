import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngxs/store';

import { APP_ROUTES } from '@shared/constants/app-routes.const';
import { RegisterUser } from '@shared/auth/store/auth.actions';

import { RegistrationModel } from '@models/registration.model';

import { RegistrationFormService } from '../../services/registration-form.service';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-registration',
    templateUrl: 'registration.component.html',
    styleUrls: ['registration.component.scss']
})
export class RegistrationComponent {
    readonly loginLink = [`/${APP_ROUTES.Login}`];

    form = this.registrationFormService.createForm();

    hidePassword = true;

    constructor(private registrationFormService: RegistrationFormService, private store: Store) {}

    onRegisterUser(): void {
        if (this.form.invalid || this.form.pristine || this.form.pending) {
            this.form.markAllAsTouched();

            return;
        }

        this.form.markAsPristine();
        this.store.dispatch(new RegisterUser(new RegistrationModel(this.form.getRawValue() as Partial<RegistrationModel>)));
    }
}

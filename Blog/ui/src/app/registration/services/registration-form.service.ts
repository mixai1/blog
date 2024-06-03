import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';

import { RegistrationFormInterface } from '@models/form-interfaces/registration-form.interface';

import { EMAIL_PATTERN, ValidationHelper } from '@shared/helpers/validation.helper';

@Injectable()
export class RegistrationFormService {
    constructor(private fb: FormBuilder) {}

    createForm(): FormGroup<RegistrationFormInterface> {
        const form = this.fb.nonNullable.group({
            email: this.fb.nonNullable.control('', {
                validators: [Validators.required, Validators.pattern(EMAIL_PATTERN)],
            }),
            password: [
                '',
                [
                    Validators.required,
                    Validators.minLength(6),
                    ValidationHelper.upperCase(),
                    ValidationHelper.lowerCase(),
                    ValidationHelper.numberCase()
                ]
            ],
            confirmPassword: ['', Validators.required]
        });
        form.addValidators(ValidationHelper.valueMatch('password', 'confirmPassword'));
        return form;
    }
}

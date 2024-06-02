import { AbstractControl, AsyncValidatorFn, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { catchError, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { EMAIL_PATTERN, ValidationHelper } from '@shared/helpers/validation.helper';

import { RegistrationApiService } from './registration-api.service';

@Injectable()
export class RegistrationFormService {
    constructor(private fb: FormBuilder, private apiService: RegistrationApiService) {}

    createForm(): FormGroup<{
        email: FormControl<string>;
        agree: FormControl<boolean>;
        password: FormControl<string>;
        confirmPassword: FormControl<string>;
    }> {
        const form = this.fb.nonNullable.group({
            email: this.fb.nonNullable.control('', {
                validators: [Validators.required, Validators.pattern(EMAIL_PATTERN)],
                asyncValidators: [this.usernameAsyncValidator()],
                updateOn: 'blur'
            }),
            agree: [false, [Validators.requiredTrue]],
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

    public usernameAsyncValidator(): AsyncValidatorFn {
        return (control: AbstractControl<string>): Observable<ValidationErrors | null> => {
            if (!control.dirty || !control.value) {
                return of(null);
            }

            return this.apiService.checkExistence(control.value).pipe(
                catchError(() => of({ errorSignUp: true })),
                map(exists => (exists ? { existUserName: true } : null))
            );
        };
    }
}

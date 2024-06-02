import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const NAME_PATTERN = /^[a-zа-я\d]+(-?)[a-zа-я\d]+$/i;

const SPECIAL_SYMBOLS = /[^<>()[\]\\.,;:\s@"]+/;
const SYMBOLS = /[a-zA-Z\d]+/;
export const EMAIL_PATTERN = new RegExp(
    `^${SPECIAL_SYMBOLS.source}(\\.${SPECIAL_SYMBOLS.source})*@((${SYMBOLS.source}(-*${SYMBOLS.source})*)\\.)+[a-zA-Z]+$`
);

export const UPPERCASE_PATTERN = /(?=.*[A-Z])/;

export const LOWERCASE_PATTERN = /(?=.*[a-z])/;

export const NUMBER_PATTERN = /(?=.*\d)/;

export const PHONE_NUMBER = /^[+]?\d[0-9-]*$/;

export class ValidationHelper {
    public static noWhitespaceValidator(): ValidatorFn {
        return (control: AbstractControl<string>): ValidationErrors | null => {
            return control.value && !control.value.trim() ? { whitespace: true } : null;
        };
    }

    public static upperCase(): ValidatorFn {
        return (control: AbstractControl<string>): ValidationErrors | null => {
            return control.value && !UPPERCASE_PATTERN.test(control.value) ? { noUpperCase: true } : null;
        };
    }

    public static lowerCase(): ValidatorFn {
        return (control: AbstractControl<string>): ValidationErrors | null => {
            return control.value && !LOWERCASE_PATTERN.test(control.value) ? { noLowerCase: true } : null;
        };
    }

    public static numberCase(): ValidatorFn {
        return (control: AbstractControl<string>): ValidationErrors | null => {
            return control.value && !NUMBER_PATTERN.test(control.value) ? { noNumberCase: true } : null;
        };
    }

    public static valueNoMatch(firstControlName: string, secondControlName: string): ValidatorFn {
        return (formGroup: AbstractControl): ValidationErrors | null => {
            const firstControl = formGroup.get(firstControlName);
            const secondControl = formGroup.get(secondControlName);
            if (!secondControl || !firstControl) {
                return null;
            }

            if (secondControl.value === firstControl.value) {
                secondControl.setErrors({ ...secondControl.errors, match: true });
                return { match: true };
            }

            if (secondControl.errors && !!secondControl.errors['match']) {
                delete secondControl.errors['match'];
                secondControl.updateValueAndValidity();
            }
            return null;
        };
    }

    public static valueMatch(firstControlName: string, secondControlName: string): ValidatorFn {
        return (formGroup: AbstractControl): ValidationErrors | null => {
            const firstControl = formGroup.get(firstControlName);
            const secondControl = formGroup.get(secondControlName);
            if (!secondControl || !firstControl) {
                return null;
            }

            if (secondControl.value !== firstControl.value) {
                secondControl.setErrors({ ...secondControl.errors, noMatch: true });
                return { noMatch: true };
            }

            if (secondControl.errors && !!secondControl.errors['noMatch']) {
                delete secondControl.errors['noMatch'];
                secondControl.updateValueAndValidity();
            }
            return null;
        };
    }

    public static phoneCase(): ValidatorFn {
        return (control: AbstractControl<string>): ValidationErrors | null => {
            return control.value && !PHONE_NUMBER.test(control.value) ? { phoneInvalid: true } : null;
        };
    }
}

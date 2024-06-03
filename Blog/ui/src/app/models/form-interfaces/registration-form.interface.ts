import { FormControl } from "@angular/forms";

export interface RegistrationFormInterface {
    email: FormControl<string>;
    password: FormControl<string>;
    confirmPassword: FormControl<string>;
}

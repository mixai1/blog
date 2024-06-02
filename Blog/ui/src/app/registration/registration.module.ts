import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { RegistrationComponent } from './components/registration/registration.component';
import { RegistrationFormService } from './services/registration-form.service';
import { RegistrationRoutingModule } from './registration-routing.module';

@NgModule({
    declarations: [RegistrationComponent],
    imports: [
        CommonModule,
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        ReactiveFormsModule,
        RegistrationRoutingModule,
    ],
    providers: [RegistrationFormService]
})
export class RegistrationModule {}

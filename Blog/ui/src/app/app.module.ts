import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { NgModule } from '@angular/core';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsModule } from '@ngxs/store';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { ToastrModule } from 'ngx-toastr';

import { AuthModule } from '@shared/auth/auth.module';
import { HttpModule } from '@shared/http-custom/http.module';
import { ToastComponent } from '@shared/toast/toast.component';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
    declarations: [AppComponent],
    imports: [
        NgxsModule.forRoot([], { developmentMode: !environment.production }),
        AppRoutingModule,
        AuthModule,
        BrowserAnimationsModule,
        BrowserModule,
        CommonModule,
        HttpClientModule,
        NgxsLoggerPluginModule.forRoot({ collapsed: false, disabled: environment.production }),
        NgxsRouterPluginModule.forRoot(),
        ToastComponent,
        ToastrModule.forRoot({ onActivateTick: true, toastComponent: ToastComponent }),
    ],
    providers: [
        { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } }
    ],
    exports: [HttpModule],
    bootstrap: [AppComponent]
})
export class AppModule {}

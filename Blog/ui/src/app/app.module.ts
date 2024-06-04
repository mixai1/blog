import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { NgModule } from '@angular/core';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsModule } from '@ngxs/store';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';

import { AuthModule } from '@shared/auth/auth.module';
import { ErrorInterceptor } from '@shared/interceptors/error.interceptor';
import { JwtTokenInterceptor } from '@shared/interceptors/auth-token.interceptor';
import { ToastModule } from '@shared/toast/toast.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BlogModule } from './blog/blog.module';
import { environment } from '../environments/environment';

@NgModule({
    declarations: [AppComponent],
    imports: [
        NgxsModule.forRoot([], { developmentMode: !environment.production }),
        AppRoutingModule,
        AuthModule,
        BlogModule,
        BrowserAnimationsModule,
        BrowserModule,
        CommonModule,
        HttpClientModule,
        NgxsLoggerPluginModule.forRoot({ collapsed: false, disabled: environment.production }),
        NgxsRouterPluginModule.forRoot(),
        ToastModule
    ],
    providers: [
        { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } },
        { provide: HTTP_INTERCEPTORS, useClass: JwtTokenInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        { provide: JwtHelperService },
        { provide: JWT_OPTIONS, useValue: JWT_OPTIONS }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}

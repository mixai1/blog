import { NgModule, Optional, SkipSelf } from '@angular/core';
import { NgxsModule } from '@ngxs/store';

import { AuthApiService } from './services/auth-api.service';
import { AuthState } from './store/auth.state';

@NgModule({
    imports: [NgxsModule.forFeature([AuthState])],
    providers: [AuthApiService]
})
export class AuthModule {
    constructor(@Optional() @SkipSelf() parentModule: AuthModule) {
        if (parentModule) {
            throw new Error('AuthModule is already loaded. Import it in the AppModule only');
        }
    }
}

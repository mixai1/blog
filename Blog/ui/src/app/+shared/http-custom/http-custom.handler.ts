import { EnvironmentInjector, Injectable } from '@angular/core';
import { ɵHttpInterceptingHandler } from '@angular/common/http';

import { HttpCustomBackend } from './http-custom.backend';

@Injectable()
export class HttpCustomHandler extends ɵHttpInterceptingHandler {
    constructor(backend: HttpCustomBackend, injector: EnvironmentInjector) {
        super(backend, injector);
    }
}

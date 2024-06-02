import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { HttpCustomHandler } from './http-custom.handler';

@Injectable()
export class HttpCustomClient extends HttpClient {
    constructor(handler: HttpCustomHandler) {
        super(handler);
    }
}

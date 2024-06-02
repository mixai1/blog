import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { Bridge, BridgePlugin } from '@plugins/bridge.plugin';

import { HttpCustomBackend } from './http-custom.backend';
import { HttpCustomClient } from './http-custom.client';
import { HttpCustomHandler } from './http-custom.handler';

@NgModule({
    imports: [HttpClientModule],
    providers: [HttpCustomBackend, HttpCustomHandler, HttpCustomClient, { provide: BridgePlugin, useValue: Bridge }],
    exports: [HttpClientModule]
})
export class CustomHttpModule {}

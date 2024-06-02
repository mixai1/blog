import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { HttpCustomClient } from './http-custom.client';

@NgModule({
    imports: [HttpClientModule],
    providers: [{ provide: HttpCustomClient, useExisting: HttpClient }],
    exports: [HttpClientModule]
})
export class WebHttpModule {}

import { NgModule } from '@angular/core';

import { WebHttpModule } from './web.http.module';

@NgModule({
    imports: [WebHttpModule],
    exports: [WebHttpModule]
})
export class HttpModule {}

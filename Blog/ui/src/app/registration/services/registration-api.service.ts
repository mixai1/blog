import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { BaseApiService } from '@shared/abstract/base-api.service';

@Injectable()
export class RegistrationApiService extends BaseApiService {
    public checkExistence(email: string): Observable<boolean> {
        return super.httpGet(`Registration/CheckExistence/${email}`);
    }
}

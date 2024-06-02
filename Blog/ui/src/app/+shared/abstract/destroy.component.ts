import { Directive, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Directive()
export abstract class DestroyComponent implements OnDestroy {
    destroy$ = new Subject<boolean>();

    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.complete();
    }
}

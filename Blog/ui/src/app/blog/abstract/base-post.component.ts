import { Directive, Input } from '@angular/core';

@Directive()
export abstract class BasePostComponent<T> {
    @Input() data!: T;
}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Toast } from 'ngx-toastr';

@Component({
    selector: '[app-toast-component]',
    standalone: true,
    imports: [CommonModule, MatIconModule],
    templateUrl: 'toast.component.html',
    styleUrls: ['toast.component.scss'],
    preserveWhitespaces: false
})
export class ToastComponent extends Toast {}

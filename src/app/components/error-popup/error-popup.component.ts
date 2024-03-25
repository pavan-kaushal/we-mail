import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-error-popup',
    templateUrl: 'error-popup.component.html',
    styleUrls: ['error-popup.component.scss']
})

export class ErrorPopupComponent implements OnInit {
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: {message: string, error: any},
        private _dialogRef: MatDialogRef<ErrorPopupComponent>
    ) { }

    ngOnInit() { }

    close(){
        this._dialogRef.close()
    }
}
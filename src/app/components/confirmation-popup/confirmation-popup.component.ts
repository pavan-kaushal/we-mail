import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-confirmation-popup',
    templateUrl: 'confirmation-popup.component.html',
    styleUrls: ['confirmation-popup.component.scss']
})

export class ConfirmationPopupComponent implements OnInit {
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: {title: string, message: string, callBack: Function},
        private _dialogRef: MatDialogRef<ConfirmationPopupComponent>
    ) { }

    ngOnInit() { }

    onYesClick() {
        this.data.callBack()
        this._dialogRef.close()
    }
}
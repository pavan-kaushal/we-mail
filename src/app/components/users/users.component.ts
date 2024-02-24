import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-users',
    templateUrl: 'users.component.html',
    styleUrls: ['./users.component.scss']
})

export class UsersComponent implements OnInit {
    @ViewChild('userData')
    userDialogRef: TemplateRef<any>;
    constructor(
        private _dialog: MatDialog
    ) { }

    ngOnInit() { }

    openUserDialog(userDoc?){
        this._dialog.open(this.userDialogRef, {
            width: '500px',
            data: {
                
            }
        })
    }
}
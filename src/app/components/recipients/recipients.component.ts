import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RecipientService } from './recipients.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, Validators } from '@angular/forms';
import { emailPattern } from 'src/app/utils/util-functions';
import { ConfirmationPopupComponent } from '../confirmation-popup/confirmation-popup.component';

@Component({
    selector: 'app-recipients',
    templateUrl: 'recipients.component.html',
    styleUrls: ['./recipients.component.scss']
})

export class UsersComponent implements OnInit {
    @ViewChild('userData')
    userDialogRef: TemplateRef<any>;
    tableData = [];
    constructor(
        private _dialog: MatDialog,
        private _recipientService: RecipientService,
        private _formBuilder: FormBuilder,
    ) { }

    ngOnInit() {
        this.getRecipients();
    }

    getRecipients() {
        this._recipientService.getRecipients().subscribe(res => {
            if(res.success){
                this.tableData = res.data
            }
        })
    }

    openUserDialog(userDoc?){
        this._dialog.open(this.userDialogRef, {
            width: '500px',
            data: this._formBuilder.group({
                _id: [userDoc?._id ?? ''],
                name: [userDoc?.name ?? '', Validators.required],
                email: [userDoc?.email ?? '', [Validators.required,Validators.pattern(emailPattern)]],
            })
        })
    }

    saveUser(data){
        if(data._id){
            this._recipientService.updateRecipient({id: data._id,name: data.name, email: data.email}).subscribe(res => {
                if(res.success){
                    this._dialog.closeAll();
                    this.getRecipients();
                }
            })
        } else {
            this._recipientService.addRecipient(data).subscribe(res => {
                if(res.success){
                    this._dialog.closeAll();
                    this.getRecipients();
                }
            })
        }
    }

    deleteUser(doc){
        this._dialog.open(ConfirmationPopupComponent,{
            width: '400px',
            maxHeight: '300px',
            data: {
                title: 'This Cannot be Undone',
                message: 'Are you sure you want to delete this user?',
                callBack: () => {
                    this._recipientService.deleteRecipient(doc._id).subscribe(res => {
                        this.getRecipients()
                    })
                }
            }
        })
    }

    hasError(form,field){
        return form.get(field).invalid && (form.get(field).dirty || form.get(field).touched)
    }
}
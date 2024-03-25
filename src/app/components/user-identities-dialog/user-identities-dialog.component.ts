import { Component, OnInit } from '@angular/core';
import { EmailIdentitiesService } from './email-identities.service';
import { AuthService } from '../authorisation/auth.service';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { emailPattern } from 'src/app/utils/util-functions';

@Component({
    selector: 'app-identities-user-dialog',
    templateUrl: 'user-identities-dialog.component.html',
    styleUrls: ['user-identities-dialog.component.scss']
})

export class UserDialogComponent implements OnInit {
    user;
    emailIdentities;
    isDataLoading = false;
    emailValue: FormControl;
    constructor(
        private _emailIdentitiesService: EmailIdentitiesService,
        private _authService: AuthService,
        private _ref: MatDialogRef<UserDialogComponent>,
    ) { }

    ngOnInit() {
        this.user = this._authService.getCurrentUser();
        this.getIdentities()
        this.emailValue = new FormControl('',[Validators.required,Validators.pattern(emailPattern)])
    }

    getIdentities(){
        this.isDataLoading = true;
        this._emailIdentitiesService.getUserIdentities().subscribe(res => {
            if(res.success){
                console.log(res.data)
                this.emailIdentities = res.data
                this.isDataLoading = false;
            }
        })
    }

    addEmailIdentity(){
        if(this.emailValue.invalid){
            return;
        }
        this._emailIdentitiesService.addEmail(this.emailValue.value).subscribe(res => {
            if(res.success){
                this.emailValue.reset();
                this.getIdentities();
            }
        })
    }

    getError(){
        if(this.emailValue.invalid && this.emailValue.dirty){
            if(this.emailValue.errors.required){
                return 'Email Is Not Provided'
            }
            if(this.emailValue.errors.pattern){
                return 'Email Is Invalid'
            }
        }
    }

    close(){
        this._ref.close()
    }
}
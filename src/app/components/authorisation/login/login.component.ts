import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';
import { emailPattern } from 'src/app/utils/util-functions';

@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.scss']
})

export class LoginComponent implements OnInit, OnDestroy {
    email: string;
    password: string;
    loginForm: FormGroup;
    $tokenSubscription: Subscription;
    
    constructor(
        private _router: Router,
        private _formBuilder: FormBuilder,
        private _toastrService: ToastrService,
        private _authService: AuthService,
    ) { }

    ngOnInit() {
        this.$tokenSubscription = this._authService.getAuthTokenSubject().subscribe(val => {
            if(val){
                this._router.navigate(['/home/users'])
            }
        })
        
        this.loginForm = this._formBuilder.group({
            email: ['', [Validators.required,Validators.pattern(emailPattern)]],
            password: ['', Validators.required],
        });
    }


    onSubmit() {
        if(this.loginForm.invalid){
            if(this.loginForm.get('email').invalid){
                if(this.loginForm.get('email').errors.required){
                    this._toastrService.warning("Email is Required")
                }
                if(this.loginForm.get('email').errors.pattern){
                    this._toastrService.warning("Email is Invalid")
                }
            }
            if(this.loginForm.get('password').invalid){
                this._toastrService.warning("Password is Required")
            }
            return;
        }
        this._authService.signInUser({
            email: this.loginForm.get('email').value,
            password: this.loginForm.get('password').value,
        }).subscribe(res => {
            if(res.success){
             this.loginForm.reset();
             this._authService.setAuthToken(res.data.authToken)
            }
        })
    }

    hasError(field){
        return this.loginForm.get(field).invalid && (this.loginForm.get(field).dirty || this.loginForm.get(field).touched)
    }

    ngOnDestroy(){
        this.$tokenSubscription.unsubscribe()
    }
}
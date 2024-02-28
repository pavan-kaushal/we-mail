import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-signup',
    templateUrl: 'signup.component.html',
    styleUrls: ['signup.component.scss']
})

export class SignupComponent implements OnInit {
    isLoggedIn: boolean = false;
    signUpForm: FormGroup
    constructor(
        private _formBuilder: FormBuilder,
        private _router: Router,
        private _authService: AuthService,
        private _toastrService: ToastrService,
    ) { }

    ngOnInit() {
        if(this.isLoggedIn){
            this._router.navigate(['/home/users'])
        }
        this.signUpForm = this._formBuilder.group({
            name: ['', Validators.required],
            email: ['', [Validators.required,Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$")]],
            password: ['', Validators.required],
        });
    }

    onSubmit() {
        if(this.signUpForm.invalid){
            if(this.signUpForm.get('name').invalid){
                this._toastrService.warning("Name is Required")
            }
            if(this.signUpForm.get('email').invalid){
                if(this.signUpForm.get('email').errors.required){
                    this._toastrService.warning("Email is Required")
                }
                if(this.signUpForm.get('email').errors.pattern){
                    this._toastrService.warning("Email is Invalid")
                }
            }
            if(this.signUpForm.get('password').invalid){
                this._toastrService.warning("Password is Required")
            }
            return;
        }
        this._authService.signUpUser({
            name: this.signUpForm.get('name').value,
            email: this.signUpForm.get('email').value,
            password: this.signUpForm.get('password').value,
        }).subscribe(res => {
            if(res.success){
             this._toastrService.success("Signed Up Succesfully");
             this.signUpForm.reset();
            }
        })
    }

    hasError(field){
        return this.signUpForm.get(field).invalid && (this.signUpForm.get(field).dirty || this.signUpForm.get(field).touched)
    }
}
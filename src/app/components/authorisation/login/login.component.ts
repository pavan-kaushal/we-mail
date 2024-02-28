import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.scss']
})

export class LoginComponent implements OnInit {
    isLoggedIn: boolean = false;
    email: string;
    password: string;
    constructor(
        private _router: Router,
    ) { }

    ngOnInit() {
        if(this.isLoggedIn){
            this._router.navigate(['/home/users'])
          }
     }
}
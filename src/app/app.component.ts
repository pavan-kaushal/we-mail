import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isLoggedIn = true;

  constructor(
    private _router: Router,
  ) {

  }
  
  ngOnInit() {
    if(this.isLoggedIn){
      this._router.navigate(['/home/users'])
    } else {
      this._router.navigate(['/login'])
    }
  }
}

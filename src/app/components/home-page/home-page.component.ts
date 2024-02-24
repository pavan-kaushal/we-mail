import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  activeLink;

  constructor(
    private _router: Router,
  ) {

  }
  
  ngOnInit() {
    this.activeLink = '/users';
  }

  navigate(link){
    this.activeLink = link;
    this._router.navigate([`home${link}`])
  }
}

import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isMenuOpen = false;
  activeLink;

  constructor(
    private _router: Router,
  ) {

  }
  
  ngOnInit() {
    this._router.events.pipe(
      filter(event => event instanceof NavigationEnd)  
    ).subscribe((event: NavigationEnd) => {
      this.activeLink = event.url
    });
    if(!this.activeLink){
      this.navigate('/events')
    }
  }

  navigate(link){
    this._router.navigate([link])
  }
}

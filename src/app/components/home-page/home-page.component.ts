import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  links = ['/users', '/events', '/activity'];

  constructor(
    private _router: Router,
  ) {

  }
  
  ngOnInit() {
  }
}

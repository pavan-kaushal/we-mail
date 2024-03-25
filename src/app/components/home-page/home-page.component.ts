import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserDialogComponent } from '../user-identities-dialog/user-identities-dialog.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(
    private _dialog: MatDialog,
  ) {
  }
  
  ngOnInit() {
  }

  openUserDialog(){
    this._dialog.open(UserDialogComponent, {
      maxHeight: '650px',
      width: '450px',
      panelClass: 'user-dialog-panel'
    })
  }
}

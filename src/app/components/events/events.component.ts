import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-events',
    templateUrl: 'events.component.html',
    styleUrls: ['events.component.scss']
})

export class EventsComponent implements OnInit {
    @ViewChild('eventData')
    eventDialogRef: TemplateRef<any>;
    constructor(
        private _dialog: MatDialog
    ) { }

    ngOnInit() { }

    openEventDialog(eventDoc?){
        this._dialog.open(this.eventDialogRef, {
            width: '500px',
            data: {
                
            }
        })
    }
}
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EventService } from './events.service';
import { setEventClass } from 'src/app/utils/util-functions';
import { EmailIdentitiesService } from '../user-identities-dialog/email-identities.service';
import { ConfirmationPopupComponent } from '../confirmation-popup/confirmation-popup.component';
import { RecipientService } from '../recipients/recipients.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-events',
    templateUrl: 'events.component.html',
    styleUrls: ['events.component.scss']
})

export class EventsComponent implements OnInit {
    @ViewChild('eventData')
    eventDialogRef: TemplateRef<any>;
    @ViewChild('recipients')
    recipientsDialogRef: TemplateRef<any>;
    emailIdentities = [];
    events = [];
    constructor(
        private _dialog: MatDialog,
        private _formBuilder: FormBuilder,
        private _eventService: EventService,
        private _emailIdentitiesService: EmailIdentitiesService,
        private _recipientService: RecipientService,
        private _router: Router,
        private _toastrService: ToastrService,
    ) { }

    ngOnInit() {
        this.getEvents()
    }

    getEvents(){
        this.events = [];
        this._eventService.getEvents().subscribe(res => {
            if(res.success){
                this.events = res.data.map(doc => {
                    return {
                        ...doc,
                        class: setEventClass(doc.name)
                    }
                })
            }
        })
    }

    saveEvent(data){
        if(data._id){
            this._eventService.updateEvent(data).subscribe(res => {
                if(res.success){
                    this._dialog.closeAll();
                    this.getEvents();
                }
            })
        } else {
            this._eventService.addEvent(data).subscribe(res => {
                if(res.success){
                    this._dialog.closeAll();
                    this.getEvents();
                }
            })
        }
    }

    openEventDialog(eventDoc?){
        this.emailIdentities = [];
        this._emailIdentitiesService.getVerifiedIdentities().subscribe(res => {
            if(res.success){
                this.emailIdentities = res.data;
                this._dialog.open(this.eventDialogRef, {
                    width: '500px',
                    data: this._formBuilder.group({
                            _id: [eventDoc?._id],
                            name: [eventDoc?.name ?? '', Validators.required], 
                            emailIdentity: [eventDoc?.emailIdentity ?? '', [Validators.required]],
                            description: [eventDoc?.name ?? '', Validators.required],
                            attributes: [eventDoc?.attributes?.length ? eventDoc.attributes.join(',') : '', Validators.pattern("^[A-Za-z0-9_,]+$")]
                    })
                })
            }
        })
    }

    onDeleteClick(event){
        this._dialog.open(ConfirmationPopupComponent, {
            data: {
                title: 'This Cannot be Undone',
                message: 'Are you sure you want to delete this event?',
                callBack: () => {
                    this._eventService.deleteEvent(event._id).subscribe(res => {
                        if(res.success){
                            this.getEvents()
                        }
                    })
                }
            }
        })
    }

    hasError(form,field){
        return form.get(field).invalid && (form.get(field).dirty || form.get(field).touched)
    }

    openRecipientAssignmentDialog(event){
        this._recipientService.getRecipients().subscribe(res => {
            if(res.success){
                const assignedRecipientsSet = new Set(event.recipients)
                this._dialog.open(this.recipientsDialogRef, {
                    width: '450px',
                    maxHeight: '90vh',
                    data: {
                        event: event,
                        recipients: res.data.map(doc => {
                            return {
                            ...doc,
                            isSelected: assignedRecipientsSet.has(doc._id)
                        }
                    })}
                })
            }
        })
    }

    updateRecipients(event,recipients){
        const selectedRecipientIds = recipients.filter(doc => doc.isSelected).map(doc => doc._id)
        if(!selectedRecipientIds?.length){
            this._toastrService.warning("Selected Atleast One Recipient")
            return;
        }
        this._eventService.updateRecipients(event._id,selectedRecipientIds).subscribe(res => {
            if(res.success){
                this._dialog.closeAll();
                this.getEvents();
            }
        })
    }

    navigateToEventDetails(event){
        this._router.navigate(['/home/events/event'], { queryParams: { id: event._id }});
    }

}
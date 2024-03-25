import { Component, ElementRef, HostListener, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../events.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-event-screen',
    templateUrl: 'event-screen.component.html',
    styleUrls: ['event-screen.component.scss']
})

export class EventScreenComponent implements OnInit {
    @ViewChild('uploadDialog')
    uploadDialogRef: TemplateRef<any>;
    @ViewChild('editTemplateDialog')
    editTemplateDialogRef: TemplateRef<any>;
    @ViewChild('fileInput')
    fileInputRef: ElementRef<HTMLInputElement>;
    eventDetails;
    showApiDataDialog = false;
    isUrlCopied = false; 
    eventUrl="higihfvkhvhkvkhvkhvkhfvkhvkhjjkhkhkhfkh";
    isDataLoading = false;
    selectedFile = null;
    constructor(
        private route: ActivatedRoute,
        private _eventService: EventService,
        private _dialog: MatDialog,
        private _toastrService: ToastrService
    ) { }

    @HostListener('click', ['$event.target'])
    documentClick(targetElement){
      const button = document.getElementsByClassName('api-btnn')[0];
      const wrapper = document.getElementsByClassName('api-content-wrapper')[0];
  
      if(!button?.contains(targetElement) && !wrapper?.contains(targetElement) && this.showApiDataDialog){
        this.showApiDataDialog = false;
      }
    }

    ngOnInit() { 
        const eventId = this.route.snapshot.queryParams['id']
        this.getEventDetails(eventId)
    }

    getEventDetails(id){
        this.isDataLoading = true;
        this._eventService.getEventDetails(id).subscribe(res =>{
            if(res.success){
                this.eventDetails = res.data;
                this.isDataLoading = false;
            }
        })
    }

    copyUrl(){
        const urlElem = document.getElementsByClassName('trigger-url')[0];
        console.log(urlElem.innerHTML);
        navigator.clipboard.writeText(urlElem.innerHTML);
        this.isUrlCopied = true;
        this._toastrService.success("URL Copied to Clipboard")
        setTimeout(() => {
            this.isUrlCopied = false
        },3000)
    }

    browseFiles(){
        if(this.selectedFile){
            this._toastrService.warning("Clear Selection to Upload");
            return
        }
        this.fileInputRef.nativeElement.click();
    }

    onFileSelected(event: Event) {
        const inputElement = (event.target as HTMLInputElement);
        const files: FileList = inputElement.files;
        if (files.length > 1) {
          this._toastrService.warning('Please select only one file.');
          return;
        }       
        const file: File = files[0];
        this.selectedFile = file;
        console.log('Selected file:', file);
    }

    resetFileSelect(){
        this.fileInputRef.nativeElement.value = '';
        this.selectedFile = null;
    }

    openUploadDialog(){
        this.selectedFile = null;
        this._dialog.open(this.uploadDialogRef,{
            width: '25vw',
            panelClass: 'attributes-upload-dialog'
        }).afterClosed().subscribe(() => {
            this.fileInputRef.nativeElement.value = '';
            this.selectedFile = null;
        })
    }

    openEditTemplateDialog(){

    }
}
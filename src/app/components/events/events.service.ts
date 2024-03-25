import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BaseService } from 'src/app/utils/base.service';
import { ResponseJson } from 'src/app/utils/models';

@Injectable({providedIn: 'root'})
export class EventService extends BaseService {
    apiUrl = environment.apiUrl + '/event';
    constructor(private _httpClient: HttpClient) {
        super(_httpClient);
        
    }

    getEvents() {
        return this.get<ResponseJson<any>>(this.apiUrl, null)
    }

    getEventDetails(id) {
        return this.get<ResponseJson<any>>(this.apiUrl+`/event/${id}`, null)
    }

    addEvent(data){
        return this.put<ResponseJson<any>>(this.apiUrl,data)
    }

    updateEvent(data){
        return this.post<ResponseJson<any>>(this.apiUrl,data)
    }

    updateRecipients(event, users){
        return this.post<ResponseJson<any>>(this.apiUrl+'/recipients',{event, users})
    }

    deleteEvent(id){
        return this.delete<ResponseJson<any>>(this.apiUrl,{data: {_id: id}})
    }
}
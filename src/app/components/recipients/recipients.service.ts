import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BaseService } from 'src/app/utils/base.service';
import { ResponseJson } from 'src/app/utils/models';

@Injectable({providedIn: 'root'})
export class RecipientService extends BaseService {
    apiUrl = environment.apiUrl + '/recipient';
    constructor(private _httpClient: HttpClient) {
        super(_httpClient);
        
    }

    getRecipients(){
        return this.get<ResponseJson<any>>(this.apiUrl, null)
    }

    addRecipient(data){
        return this.put<ResponseJson<any>>(this.apiUrl,data)
    }

    updateRecipient(data){
        return this.post<ResponseJson<any>>(this.apiUrl,data)
    }

    deleteRecipient(id){
        return this.delete<ResponseJson<any>>(this.apiUrl,{data: {_id: id}})
    }
}
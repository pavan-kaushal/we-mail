import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BaseService } from 'src/app/utils/base.service';
import { ResponseJson } from 'src/app/utils/models';

@Injectable({providedIn: 'root'})
export class EmailIdentitiesService extends BaseService {
    apiUrl = environment.apiUrl + '/email-identity';
    constructor(private _httpClient: HttpClient) {
        super(_httpClient);
        
    }
    
    getUserIdentities(){
        return this.get<ResponseJson<any>>(this.apiUrl, null)
    }
    
    getVerifiedIdentities(){
        return this.get<ResponseJson<any>>(this.apiUrl+'/verified', null)
    }

    addEmail(email){
        return this.put<ResponseJson<any>>(this.apiUrl, {email})
    }

    deleteEmail(id){
        return this.put<ResponseJson<any>>(this.apiUrl, {data: {_id: id}})
    }
}
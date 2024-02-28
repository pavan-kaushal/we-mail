import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BaseService } from 'src/utils/base.service';

HttpClient
@Injectable({providedIn: 'root'})
export class AuthService extends BaseService {
    apiUrl = environment.apiUrl + '/auth';

    constructor(private _httpClient: HttpClient) {
        super(_httpClient);
    }

    signUpUser(data){
        return this.put<any>(this.apiUrl+'/signup',data)
    }

    signInUser(data){
        return this.post<any>(this.apiUrl+'/signin',data)
    }
    
}
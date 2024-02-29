import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BaseService } from 'src/utils/base.service';

HttpClient
@Injectable({providedIn: 'root'})
export class AuthService extends BaseService {
    apiUrl = environment.apiUrl + '/auth';
    authToken = new BehaviorSubject<string>(null);
    constructor(private _httpClient: HttpClient) {
        super(_httpClient);
        
    }

    getAuthToken(){
        const token = localStorage.getItem('authToken')
        if(token){
            this.authToken.next(token);
        }
        return this.authToken
    }

    signUpUser(data){
        return this.put<any>(this.apiUrl+'/signup',data)
    }

    signInUser(data){
        return this.post<any>(this.apiUrl+'/signin',data)
    }
    
    setRefreshToken(token){
        localStorage.setItem('authToken',token)
        this.authToken.next(token)
    }

    logOut(){
        localStorage.removeItem('authToken')
        this.authToken.next(null)
    }

    isTokenValid(){
        
    }
}
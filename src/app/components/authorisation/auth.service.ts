import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BaseService } from 'src/app/utils/base.service';
import { ResponseJson } from 'src/app/utils/models';
@Injectable({providedIn: 'root'})
export class AuthService extends BaseService {
    private apiUrl = environment.apiUrl + '/auth';
    private authToken = new BehaviorSubject<string>(null);
    private currentUser = new BehaviorSubject<any>(null);
    constructor(private _httpClient: HttpClient) {
        super(_httpClient);
        const token = localStorage.getItem('authToken')
        if(token && !this.authToken.value){
            this.authToken.next(token);
        }
    }

    getAuthTokenSubject(){
        const token = localStorage.getItem('authToken')
        if(token && !this.authToken.value){
            this.authToken.next(token);
        }
        return this.authToken
    }

    getAuthToken(){
        return this.authToken.value || localStorage.getItem('authToken')
    }

    signUpUser(data){
        return this.put<ResponseJson<any>>(this.apiUrl+'/signup',data)
    }

    signInUser(data){
        return this.post<ResponseJson<any>>(this.apiUrl+'/signin',data)
    }
    
    setAuthToken(token){
        localStorage.setItem('authToken',token)
        this.authToken.next(token)
        const decodedToken: any = jwtDecode(token)
        localStorage.setItem('user',JSON.stringify({
            _id: decodedToken._id,
            name: decodedToken.name,
            email: decodedToken.email,
        }))
        this.currentUser.next({
            _id: decodedToken._id,
            name: decodedToken.name,
            email: decodedToken.email,
        })
    }

    getCurrentUser() {
        return this.currentUser.value || JSON.parse(localStorage.getItem('user'))
    }

    logOut(){
        localStorage.removeItem('authToken')
        localStorage.removeItem('user')
        this.authToken.next(null)
        this.currentUser.next(null)
    }

    isAuthTokenExpired(){
        const token = this.getAuthToken();
        if(!token){
            this.logOut()
            return true;
        }
        const decodedToken = jwtDecode(token);
        if (decodedToken.exp === undefined) { 
            this.logOut()
            return true; 
        }
        const expirationTimeInSeconds = decodedToken.exp;
        const expirationUtc = new Date(expirationTimeInSeconds * 1000).toUTCString();
        const currentUtc = new Date().toUTCString();
        return expirationUtc > currentUtc
    }
}

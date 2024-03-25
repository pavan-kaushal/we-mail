import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/components/authorisation/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    token 
    constructor(private _authService:  AuthService) {

    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        let req = request; 
        const token = this._authService.getAuthToken()
        if(token){
            req = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${token}`
                }
            });
        }
        return next.handle(req)
    }
}

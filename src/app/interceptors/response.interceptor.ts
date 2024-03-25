import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { RESPONSE_CODES } from 'src/app/utils/enums';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/components/authorisation/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorPopupComponent } from 'src/app/components/error-popup/error-popup.component';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {

  constructor(
    private _toastrService: ToastrService,
    private _router: Router,
    private _authService: AuthService,
    private _dialog: MatDialog
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap(res => {
          if(res instanceof HttpResponse){
            console.log('Response received:', res);
            if(res.body.success){
                if(res.body?.message?.length){
                    this._toastrService.success(res.body.message)
                }
            } else {
                if(res.body.code==RESPONSE_CODES.TOKEN_EXPIRED){
                    this._authService.logOut();
                    this._router.navigate(['/login'])
                }
                this._dialog.open(ErrorPopupComponent,{
                    data: {
                        message: res.body.message,
                        error: res.body.data
                    }
                })
            }
            return next.handle(request);
        }
      })
    );
  }
}
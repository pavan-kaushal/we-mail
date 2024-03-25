import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class BaseService {
  constructor(protected http: HttpClient) {

  }

  public get<T>(url: string, requestBody: any, responseType?): Observable<T> {
    return this.http.get<T>(url, { headers: httpOptions.headers, params: requestBody, responseType: responseType }).pipe(
      catchError((error) => this.handleError(error))
    );
  }
  
  public post<T>(url: string, requestBody: any): Observable<any> {
    return this.http.post<T>(url, requestBody, { headers: httpOptions.headers }).pipe(
      catchError((error) => this.handleError(error))
    );
  }

  public put<T>(url: string, requestBody: any): Observable<any> {
    return this.http.put<T>(url, requestBody, { headers: httpOptions.headers }).pipe(
      catchError((error) => this.handleError(error))
    );
  }

  public delete<T>(url: string, requestBody: any, extraParams?: any): Observable<any> {
    return this.http.delete<T>(url + '/' + requestBody?.data?._id, extraParams);
  }

  protected handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.log('error :' + error.message);
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }

  protected extractData(res: Response) {
    const body = res;
    return body || {};
  }
}

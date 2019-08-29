import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import {catchError, retry} from 'rxjs/internal/operators';
import {throwError} from 'rxjs/index';
import 'rxjs/add/operator/map'
import {promise} from 'selenium-webdriver';
import Promise = promise.Promise;

@Injectable()
export class APIService implements OnInit {

  constructor(private http: HttpClient) { }
  ngOnInit(): void {
  }

  httpOptions: any = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'my-auth-token'
    })
  };

  get(url) {
    return this.http.get(url).pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError)
    ).toPromise().then((data:any) =>
    {
      return data;
    });
  }

  getWithObserve(url) {
    // now returns an Observable of Config
    return this.http.get<any>(url).pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError)
    ).subscribe(data=>
    {
      return data;
    });
  };

  getWithOptions(url, httpOptions) {
    return this.http.get(url, httpOptions).pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError)
    ).subscribe(data=>
    {
      return data;
    });
  };

  getWithObserveAndOptions(url, httpOptions): Observable<any> {
    // now returns an Observable of Config
    return this.http.get(url, httpOptions).pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError)
    );
  };

  getFullResponse(url): Observable<HttpResponse<any>> {
    return this.http.get<any>(
      url, { observe: 'response' }).pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError)
    );
  };

  post(url, model) {
    return this.http.post(url, model)
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError)
      ).toPromise().then((data:any) =>
      {
        return data;
      });
  };

  postWithOptions(url, model, httpOptions) {
    return this.http.post(url, model, httpOptions)
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError)
      ).subscribe(data=>
      {
        return data;
      });
  };

  postWithObserve(url, model): Observable<HttpResponse<any>> {
    return this.http.post<any>(url, model)
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError)
      );
  };

  /*    postWithObserveAndOptions(url, model, httpOptions): Observable<HttpResponse<any>> {
          return this.http.post<any>(url, model, httpOptions)
              .pipe(
                  retry(3), // retry a failed request up to 3 times
                  catchError(this.handleError)
              );
      };*/


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
}

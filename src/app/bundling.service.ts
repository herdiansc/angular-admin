import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class BundlingService {
  headers = new HttpHeaders({
    'Content-Type':  'application/json'
  });

  constructor(private http: HttpClient) { }
  
  private extractData(res: HttpResponse<any>) {
    let data = { };
    if (res.headers.get('x-total-count') != null) {
      data = {
        'body': res.body, 
        'x_total_count': res.headers.get('x-total-count')
      };
    } else {
      data = res.body;
    }
    return data;
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getBundlings(keyword: string='', page: any, limit: any): Observable<any> {
    let queryString: string = '&_expand=pack&_expand=benefit';
    queryString += '&q=' + keyword.trim();
    queryString += '&_limit=' + limit;
    queryString += '&_page=' + page;

    let params = new HttpParams({
      fromString: queryString
    });
    
    return this.http.get(environment.endpoint + 'bundlings', {params: params, observe: 'response' }).pipe(
      tap((bundling) => console.log(bundling)),
      map(this.extractData)
    );
  }

  getBundling(id): Observable<any> {
    let params = new HttpParams({
      fromString: '&_expand=pack&_expand=benefit'
    });
    return this.http.get(environment.endpoint + 'bundlings/' + id, {params: params, observe: 'response'}).pipe(
      map(this.extractData));
  }

  addBundling (bundling): Observable<any> {
    console.log(bundling);
    return this.http.post<any>(environment.endpoint + 'bundlings', JSON.stringify(bundling), {headers: this.headers, observe: 'response'}).pipe(
      tap((bundling) => console.log(`added bundling w/ id=`)),
      catchError(this.handleError<any>('addBundling'))
    );
  }

  updateBundling (id, bundling): Observable<any> {
    return this.http.put(environment.endpoint + 'bundlings/' + id, JSON.stringify(bundling), {headers: this.headers, observe: 'response'}).pipe(
      tap(_ => console.log(`updated bundling id=${id}`)),
      catchError(this.handleError<any>('updateBundling'))
    );
  }

  deleteBundling (id): Observable<any> { 
    return this.http.delete<any>(environment.endpoint + 'bundlings/' + id, {headers: this.headers, observe: 'response'}).pipe(
      tap(_ => console.log(`deleted bundling id=${id}`)),
      catchError(this.handleError<any>('deleteBundling'))
    );
  }
}

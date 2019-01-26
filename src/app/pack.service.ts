import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PackService {
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

  getPacks(keyword: string='', page: any, limit: any): Observable<any> {
    let queryString: string = '';
    queryString += '&q=' + keyword.trim();
    queryString += '&_limit=' + limit;
    queryString += '&_page=' + page;

    let params = new HttpParams({
      fromString: queryString
    });
    
    return this.http.get(environment.endpoint + 'packs', {params: params, observe: 'response' }).pipe(
      tap((pack) => console.log(pack)),
      map(this.extractData)
    );
  }

  getPack(id): Observable<any> {
    return this.http.get(environment.endpoint + 'packs/' + id, {observe: 'response'}).pipe(
      map(this.extractData));
  }

  addPack (pack): Observable<any> {
    console.log(pack);
    return this.http.post<any>(environment.endpoint + 'packs', JSON.stringify(pack), {headers: this.headers, observe: 'response'}).pipe(
      tap((pack) => console.log(`added pack w/ id=`)),
      catchError(this.handleError<any>('addPack'))
    );
  }

  updatePack (id, pack): Observable<any> {
    return this.http.put(environment.endpoint + 'packs/' + id, JSON.stringify(pack), {headers: this.headers, observe: 'response'}).pipe(
      tap(_ => console.log(`updated pack id=${id}`)),
      catchError(this.handleError<any>('updatePack'))
    );
  }

  deletePack (id): Observable<any> { 
    return this.http.delete<any>(environment.endpoint + 'packs/' + id, {headers: this.headers, observe: 'response'}).pipe(
      tap(_ => console.log(`deleted pack id=${id}`)),
      catchError(this.handleError<any>('deletePack'))
    );
  }
}

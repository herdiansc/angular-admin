import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class BenefitService {
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

  getBenefits(keyword: string='', page: any, limit: any): Observable<any> {
    let queryString: string = '';
    queryString += '&q=' + keyword.trim();
    queryString += '&_limit=' + limit;
    queryString += '&_page=' + page;

    let params = new HttpParams({
      fromString: queryString
    });
    
    return this.http.get(environment.endpoint + 'benefits', {params: params, observe: 'response' }).pipe(
      tap((benefit) => console.log(benefit)),
      map(this.extractData)
    );
  }

  getBenefit(id): Observable<any> {
    return this.http.get(environment.endpoint + 'benefits/' + id, {observe: 'response'}).pipe(
      map(this.extractData));
  }

  addBenefit (benefit): Observable<any> {
    console.log(benefit);
    return this.http.post<any>(environment.endpoint + 'benefits', JSON.stringify(benefit), {headers: this.headers, observe: 'response'}).pipe(
      tap((benefit) => console.log(`added benefit w/ id=`)),
      catchError(this.handleError<any>('addBenefit'))
    );
  }

  updateBenefit (id, benefit): Observable<any> {
    return this.http.put(environment.endpoint + 'benefits/' + id, JSON.stringify(benefit), {headers: this.headers, observe: 'response'}).pipe(
      tap(_ => console.log(`updated benefit id=${id}`)),
      catchError(this.handleError<any>('updateBenefit'))
    );
  }

  deleteBenefit (id): Observable<any> { 
    return this.http.delete<any>(environment.endpoint + 'benefits/' + id, {headers: this.headers, observe: 'response'}).pipe(
      tap(_ => console.log(`deleted benefit id=${id}`)),
      catchError(this.handleError<any>('deleteBenefit'))
    );
  }
}

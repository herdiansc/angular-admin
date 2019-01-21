import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {
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

  getCustomers(keyword: string='', page: any, limit: any): Observable<any> {
    let queryString: string = '';
    queryString += '&q=' + keyword.trim();
    queryString += '&_limit=' + limit;
    queryString += '&_page=' + page;

    let params = new HttpParams({
      fromString: queryString
    });
    
    return this.http.get(environment.endpoint + 'customers', {params: params, observe: 'response' }).pipe(
      map(this.extractData));
  }

  getCustomer(id): Observable<any> {
    return this.http.get(environment.endpoint + 'customers/' + id, {observe: 'response'}).pipe(
      map(this.extractData));
  }

  addCustomer (customer): Observable<any> {
    console.log(customer);
    return this.http.post<any>(environment.endpoint + 'customers', JSON.stringify(customer), {headers: this.headers, observe: 'response'}).pipe(
      tap((customer) => console.log(`added customer w/ id=`)),
      catchError(this.handleError<any>('addCustomer'))
    );
  }

  updateCustomer (id, customer): Observable<any> {
    return this.http.put(environment.endpoint + 'customers/' + id, JSON.stringify(customer), {headers: this.headers, observe: 'response'}).pipe(
      tap(_ => console.log(`updated customer id=${id}`)),
      catchError(this.handleError<any>('updateCustomer'))
    );
  }

  deleteCustomer (id): Observable<any> { 
    return this.http.delete<any>(environment.endpoint + 'customers/' + id, {headers: this.headers, observe: 'response'}).pipe(
      tap(_ => console.log(`deleted customer id=${id}`)),
      catchError(this.handleError<any>('deleteCustomer'))
    );
  }
}

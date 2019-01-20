import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class RestService {
  endpoint = 'http://localhost:3000/';
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

  getEmployees(keyword: string='', page: any, limit: any): Observable<any> {
    let queryString: string = '';
    queryString += '&q=' + keyword.trim();
    queryString += '&_limit=' + limit;
    queryString += '&_page=' + page;

    let params = new HttpParams({
      fromString: queryString
    });
    
    return this.http.get(this.endpoint + 'employees', {params: params, observe: 'response' }).pipe(
      map(this.extractData));
  }

  getEmployee(id): Observable<any> {
    return this.http.get(this.endpoint + 'employees/' + id, {observe: 'response'}).pipe(
      map(this.extractData));
  }

  addEmployee (employee): Observable<any> {
    console.log(employee);
    return this.http.post<any>(this.endpoint + 'employees', JSON.stringify(employee), {headers: this.headers, observe: 'response'}).pipe(
      tap((employee) => console.log(`added employee w/ id=`)),
      catchError(this.handleError<any>('addEmployee'))
    );
  }

  updateEmployee (id, employee): Observable<any> {
    return this.http.put(this.endpoint + 'employees/' + id, JSON.stringify(employee), {headers: this.headers, observe: 'response'}).pipe(
      tap(_ => console.log(`updated employee id=${id}`)),
      catchError(this.handleError<any>('updateEmployee'))
    );
  }

  deleteEmployee (id): Observable<any> { 
    return this.http.delete<any>(this.endpoint + 'employees/' + id, {headers: this.headers, observe: 'response'}).pipe(
      tap(_ => console.log(`deleted employee id=${id}`)),
      catchError(this.handleError<any>('deleteEmployee'))
    );
  }
}

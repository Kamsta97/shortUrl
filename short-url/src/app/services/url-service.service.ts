import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, of, Subject } from 'rxjs';
import { Url } from '../models/url';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UrlServiceService {
  private apiURL = "https://localhost:7163";
  dataSource : Url[] = [];
  dataSourceChange: BehaviorSubject<Url[]> = new BehaviorSubject(this.dataSource);
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  
  constructor(
    private httpClient: HttpClient
  ) { 
    
    this.getAll().subscribe(data => {
      this.dataSource = data;
      this.dataSourceChange.next(this.dataSource);
    })
  }

  addNewRecord(record: any) {
    this.dataSource.push(record);
    this.dataSourceChange.next(this.dataSource);
  }

  getAll(): Observable<Url[]> {
    return this.httpClient.get<Url[]>(this.apiURL + '/url/')
    .pipe(
      catchError(this.errorHandler)
    )
  }
    
  create(url: any): Observable<Url> {
    return this.httpClient.post<Url>(this.apiURL + '/url/', JSON.stringify(url), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }  
    
  find(id:any): Observable<Url> {
    return this.httpClient.get<Url>(this.apiURL + '/url/' + id)
    .pipe(
      catchError(this.errorHandler)
    )
  }
    
  update(id:any, post:any): Observable<Url> {
    return this.httpClient.put<Url>(this.apiURL + '/url/' + id, JSON.stringify(post), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
    
  delete(id:any){
    return this.httpClient.delete<Url>(this.apiURL + '/url/' + id, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
     
   
  errorHandler(error:any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
 }
}

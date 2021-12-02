import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Wish } from 'src/app/interfaces/wish';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {
  

  constructor(private http: HttpClient) { }

  getAllWishes(): Observable<Wish[]>{
    const url = '/all';
    return this.http.get<Wish[]>(url);
  }

}

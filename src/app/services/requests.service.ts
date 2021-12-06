import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Wish } from 'src/app/interfaces/wish';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {
  // For Dev Environment.
  // urlGet = 'http://localhost:3000/all';
  // urlPost = 'http://localhost:3000/add-wish';
  // urlDelete = 'http://localhost:3000/delete/'
  
  // For Production Environment
  urlGet = '/all';
  urlPost = '/add-wish';
  urlDelete = '/delete/';


  constructor(private http: HttpClient) { }

  getAllWishes(): Observable<Wish[]>{
    return this.http.get<Wish[]>(this.urlGet);
  }

  addWish(item: object): Observable<Wish>{
    return this.http.post<Wish>(this.urlPost, item);
  }

  deleteWish(wishId: number): Observable<Wish>{
    return this.http.delete<Wish>(this.urlDelete + wishId);
  }
}

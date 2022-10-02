import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Wish } from 'src/app/interfaces/wish';
import { Lists } from 'src/app/interfaces/lists';

@Injectable({
  providedIn: 'root',
})
export class RequestsService {
  // private urlGet = '/all';
  // private urlCategories = '/categories';
  // private urlPost = '/add-wish';
  // private urlDelete = '/delete/';

  private urlGet = 'http://Localhost:3000/all';
  private urlCategories = 'http://Localhost:3000/categories';
  private urlPost = 'http://Localhost:3000/add-wish';
  private urlDelete = '/delete/';

  constructor(private http: HttpClient) {}

  getAllWishes(): Observable<Lists> {
    return this.http.get<Lists>(this.urlGet);
  }

  getCategories(): Observable<any> {
    return this.http.get<any>(this.urlCategories);
  }

  addWish(item: Wish): Observable<any> {
    return this.http.post<any>(this.urlPost, item);
  }

  deleteWish(id: string): Observable<string> {
    return this.http.delete<string>(this.urlDelete + id);
  }
}

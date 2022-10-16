import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Wish } from 'src/app/interfaces/wish';
import { Lists } from 'src/app/interfaces/lists';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RequestsService {
  dashiList: Wish[] = [];
  djuliList: Wish[] = [];
  userDashi = 'dashi';
  userDjuli = 'djuli';
  // private urlGet = '/all';
  // private urlCategories = '/categories';
  // private urlPost = '/add-wish';
  // private urlDelete = '/delete/';

  private urlGet = 'http://Localhost:3000/all';
  private urlGetByUser = 'http://Localhost:3000/list';
  private urlCategories = 'http://Localhost:3000/categories';
  private urlPost = 'http://Localhost:3000/add-wish';
  private urlDelete = 'http://Localhost:3000/delete/';

  constructor(private http: HttpClient) {}

  getListByUser(): Observable<Lists> {
    return this.http.get<Lists>(this.urlGetByUser);
  }

  getCategories(): Observable<any> {
    return this.http.get<any>(this.urlCategories);
  }

  addWish(item: Wish): Observable<any> {
    if (item.user === this.userDashi) {
      this.dashiList.push(item);
    } else if (item.user === this.userDjuli) {
      this.djuliList.push(item);
    }
    return this.http.post<any>(this.urlPost, item);
  }

  deleteWish(id: string): Observable<string> {
    return this.http.delete<string>(this.urlDelete + id);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Wish } from 'src/app/interfaces/wish';

@Injectable({
  providedIn: 'root',
})
export class RequestsService {
  private urlGet = '/all';
  private urlPost = '/add-wish';
  private urlDelete = '/delete/';

  constructor(private http: HttpClient) {}

  getAllWishes(): Observable<Wish[]> {
    return this.http.get<Wish[]>(this.urlGet);
  }

  addWish(item: Wish): Observable<any> {
    return this.http.post<any>(this.urlPost, item);
  }

  deleteWish(id: string): Observable<string> {
    return this.http.delete<string>(this.urlDelete + id);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Wish } from 'src/app/interfaces/wish';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {
  urlGet = 'http://localhost:3000/all';

  options = {
    Headers
  }
  

  constructor(private http: HttpClient) { }

  getAllWishes(): Observable<Wish[]>{
    return this.http.get<Wish[]>(this.urlGet);
  }

}

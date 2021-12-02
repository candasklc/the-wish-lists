import { Component, OnInit } from '@angular/core';
import { Wish } from 'src/app/interfaces/wish';
import { RequestsService } from 'src/app/services/requests.service';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.scss']
})
export class MainpageComponent implements OnInit {
  wishList: any = [];

  constructor(private http: RequestsService) { }

  ngOnInit(): void {
    this.fetchLists();
    console.log(this.wishList);
  }

  fetchLists(): void{
    this.wishList = this.http.getAllWishes();
  }

}

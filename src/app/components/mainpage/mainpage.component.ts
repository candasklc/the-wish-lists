import { Component, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Wish } from 'src/app/interfaces/wish';
import { RequestsService } from 'src/app/services/requests.service';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.scss']
})
export class MainpageComponent implements OnInit {
  @Output() dashiList: Wish[] = [];
  @Output() djuliList: Wish[] = [];

  constructor(private http: RequestsService) { }

  ngOnInit(): void {
    this.fetchLists();
    
  }

  fetchLists(): void{
    this.http.getAllWishes().subscribe(data => {
      this.filterList(data);
    });
  }

  filterList(theLists: Wish[]): void{
    theLists.filter(x => {
      if (x.user.toLocaleLowerCase() === 'dashi') {
        this.dashiList.push(x);
      } else {
        this.djuliList.push(x);
      }
    });
  }

}

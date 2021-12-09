import { Component, Input, OnInit } from '@angular/core';
import { Wish } from 'src/app/interfaces/wish';
import { RequestsService } from 'src/app/services/requests.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() wishList : Wish[] = [];


  constructor(private http: RequestsService) { }

  ngOnInit(): void {
  }

  go(url: string): void{
    if (url.includes('https')) {
      window.open(url, '_blank');
    } else {
      window.open('https://' + url,'_blank');
    }
  }
  
  delete(wishId: number): void{
    // this.http.deleteWish(wishId).subscribe(data => {
    //   console.log(data);
    // });
    this.wishList.forEach((value,index)=>{
      if(value.wishId==wishId) {
        this.wishList.splice(index,1);
      }
    });
  }

}

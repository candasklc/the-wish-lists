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
  info = '';


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
  
  delete(id: string): void{
    console.log(this.wishList);
    this.http.deleteWish(id).subscribe(data => {
      this.info = data;
    });
    
    this.wishList.forEach((value,index)=>{
      if(value._id === id) {
        this.wishList.splice(index,1);
      }
    });
  }
}

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Wish } from 'src/app/interfaces/wish';
import { RequestsService } from 'src/app/services/requests.service';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.scss']
})
export class MainpageComponent implements OnInit {

  // ============================================== There is a bug. Mainpage component sends wrong list to table components. Last added objects have same id.

  @Output() dashiList: Wish[] = [];
  @Output() djuliList: Wish[] = [];

  @Output() userDashi = 'dashi';
  @Output() userDjuli = 'djuli';

  
  public isAddModeDashi = false;
  public isAddModeDjuli = false;

  

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
      } else if (x.user.toLocaleLowerCase() === 'djuli'){
        this.djuliList.push(x);
      }
    });
  }

  addedObjectHandler(addedWish: Wish): void{
    if (addedWish.link == '' || addedWish.title == ''){
      console.log('Empty wishes are meaningless.');
    }else if (addedWish.user.toLocaleLowerCase() == 'dashi') {
      this.dashiList.push(addedWish);
    } else if (addedWish.user.toLocaleLowerCase() == 'djuli') {
      this.djuliList.push(addedWish);
    }
  }
}

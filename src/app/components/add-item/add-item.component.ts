import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Wish } from 'src/app/interfaces/wish';
import { RequestsService } from 'src/app/services/requests.service';
@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit {
  @Input() user = '';
  @Output() addedObjectChanged: EventEmitter<Wish> =   new EventEmitter();
  public title = '';
  public link = '';

  constructor(private http: RequestsService) { }

  ngOnInit(): void {
  }

  addItem(): void{
    const newWish: Wish = {
      _id: '',
      title: '',
      link: '',
      user: '',
    };

    newWish.title = this.title;
    newWish.link = this.link;
    newWish.user = this.user;

    this.http.addWish(newWish).subscribe(data => {
      newWish._id = data.insertedId;
      console.log(data);
    });
  
    this.addedObjectChanged.emit(newWish);
  }

}

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
  @Input() addedWish: Wish = {
    _id: '',
    title: '',
    link: '',
    user: '',
  };
  @Output() addedObjectChanged: EventEmitter<Wish> =   new EventEmitter();
  public title = '';
  public link = '';

  constructor(private http: RequestsService) { }

  ngOnInit(): void {
  }

  addItem(): void{
    this.http.addWish(this.addedWish).subscribe(data => {
      this.addedWish._id = data.insertedId;
      console.log(data);
    });
    this.addedWish.title = this.title;
    this.addedWish.link = this.link;
    this.addedWish.user = this.user;
    this.addedObjectChanged.emit(this.addedWish);
  }

}

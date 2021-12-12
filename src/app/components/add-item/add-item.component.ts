import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Wish } from 'src/app/interfaces/wish';
@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit {
  @Input() user = '';
  @Input() addedWish: Wish = {
    title: '',
    link: '',
    user: ''
  };
  @Output() addedObjectChanged: EventEmitter<Wish> =   new EventEmitter();
  public title = '';
  public link = '';

  constructor() { }

  ngOnInit(): void {
  }

  addItem(): void{
    this.addedWish.title = this.title;
    this.addedWish.link = this.link;
    this.addedWish.user = this.user;
    this.addedObjectChanged.emit(this.addedWish);
  }

}

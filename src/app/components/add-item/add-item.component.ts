import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Wish } from 'src/app/interfaces/wish';
import { RequestsService } from 'src/app/services/requests.service';
@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss'],
})
export class AddItemComponent implements OnInit {
  @Input() user = '';
  @Output() addedObjectChanged: EventEmitter<Wish> = new EventEmitter();
  public form = new FormGroup({
    _id: new FormControl(''),
    title: new FormControl(''),
    link: new FormControl(''),
    user: new FormControl(''),
  });

  constructor(private http: RequestsService) {}

  ngOnInit(): void {}

  addItem(): void {
    this.form.patchValue({
      user: this.user,
    });
    this.http.addWish(this.form.value).subscribe((data) => {
      this.form.patchValue({
        _id: data.insertedId,
      });
      this.addedObjectChanged.emit(this.form.value);
    });
  }
}

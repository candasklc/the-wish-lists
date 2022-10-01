import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  private reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?'; // Url Validation
  public categories = ['clothes', 'shoes', 'electronic', 'places'];
  public form = new FormGroup({
    _id: new FormControl(''),
    title: new FormControl('', Validators.required),
    link: new FormControl('', [
      Validators.required,
      Validators.pattern(this.reg),
    ]),
    user: new FormControl(''),
    category: new FormControl('', Validators.required),
  });

  constructor(private http: RequestsService) {}

  ngOnInit(): void {}

  addItem(): void {
    console.log(this.form.value);
    // this.form.patchValue({
    //   user: this.user,
    // });
    // this.http.addWish(this.form.value).subscribe((data) => {
    //   this.form.patchValue({
    //     _id: data.insertedId,
    //   });
    //   this.addedObjectChanged.emit(this.form.value);
    // });
  }

  getErrorMessage(x: string) {
    if (this.form.controls[x].hasError('required')) {
      return `Gimme the ${x}.`;
    } else {
      return `Not a valid ${x}.`;
    }
  }
}

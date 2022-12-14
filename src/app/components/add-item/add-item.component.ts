import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Wish } from 'src/app/interfaces/wish';
import { RequestsService } from 'src/app/services/requests.service';
@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss'],
})
export class AddItemComponent implements OnInit {
  @Input() user = '';
  @Input() categories = [];
  @Output() addedObjectChanged: EventEmitter<Wish> = new EventEmitter();
  private reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?'; // Url Validation
  public form = new UntypedFormGroup({
    _id: new UntypedFormControl(''),
    title: new UntypedFormControl('', Validators.required),
    link: new UntypedFormControl('', [
      Validators.required,
      Validators.pattern(this.reg),
    ]),
    user: new UntypedFormControl(''),
    category: new UntypedFormControl('', Validators.required),
  });

  constructor(private http: RequestsService) {}

  ngOnInit(): void {
    this.fetchCategories();
  }

  addItem(): void {
    this.form.patchValue({
      user: this.user,
    });
    if (this.form.value.link == '' || this.form.value.link.title == '') {
      console.log('Empty wishes are meaningless.');
    } else {
      this.http.addWish(this.form.value).subscribe((data) => {
        this.form.patchValue({
          _id: data.insertedId,
        });
        this.addedObjectChanged.emit(this.form.value);
        this.form.reset();
      });
    }
  }

  private fetchCategories(): void {
    this.http.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  getErrorMessage(x: string) {
    if (this.form.controls[x].hasError('required')) {
      return `Gimme the ${x}.`;
    } else {
      return `Not a valid ${x}.`;
    }
  }
}

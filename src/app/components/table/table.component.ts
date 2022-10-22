import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { Wish } from 'src/app/interfaces/wish';
import { RequestsService } from 'src/app/services/requests.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @Input() user = '';
  public wishList: Wish[] = [];
  public categories = [];
  info = '';

  constructor(private http: RequestsService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.fetchCategories();
    this.fetchList();
  }

  go(url: string): void {
    if (url.includes('https')) {
      window.open(url, '_blank');
    } else {
      window.open('https://' + url, '_blank');
    }
  }

  private fetchCategories(): void {
    this.http.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  public addedObjectHandler(addedWish: Wish) {
    this.wishList.push(addedWish);
  }

  public itemCounter(categoryName: string) {
    return this.wishList.filter((item) => item.category === categoryName)
      .length;
  }

  private fetchList(): void {
    this.http.getListByUser().subscribe((data) => {
      if (this.user === 'dashi') {
        this.wishList = data.dashi;
      } else if (this.user === 'djuli') {
        this.wishList = data.djuli;
      }
    });
  }

  openDialog(id: string) {
    const dialogRef = this.dialog.open(DialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.delete(id);
      }
    });
  }

  delete(id: string): void {
    this.http.deleteWish(id).subscribe((data) => {
      this.info = data;
    });

    this.wishList.forEach((value, index) => {
      if (value._id === id) {
        this.wishList.splice(index, 1);
      }
    });
  }
}

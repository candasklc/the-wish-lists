import { Component, Input, OnInit } from '@angular/core';
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
  @Input() wishList: Wish[] = [];
  public categories = [];
  info = '';

  constructor(private http: RequestsService, public dialog: MatDialog) {}

  ngOnInit(): void {
    console.log(this.wishList);
    this.fetchCategories();
  }

  go(url: string): void {
    if (url.includes('https')) {
      window.open(url, '_blank');
    } else {
      window.open('https://' + url, '_blank');
    }
  }

  fetchCategories(): void {
    this.http.getCategories().subscribe((data) => {
      this.categories = data;
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

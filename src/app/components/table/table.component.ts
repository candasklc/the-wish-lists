import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Wish } from 'src/app/interfaces/wish';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() wishList : Wish[] = [];


  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  go(url: string): void{
    if (url.includes('https')) {
      window.open(url, '_blank');
    } else {
      window.open('https://' + url,'_blank');
    }
  }

}

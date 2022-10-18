import { Component, OnInit, Output } from '@angular/core';
import { Wish } from 'src/app/interfaces/wish';
import { RequestsService } from 'src/app/services/requests.service';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.scss'],
})
export class MainpageComponent implements OnInit {
  @Output() userDashi = 'dashi';
  @Output() userDjuli = 'djuli';

  public isAddModeDashi = false;
  public isAddModeDjuli = false;

  constructor(private http: RequestsService) {}

  ngOnInit(): void {}
}

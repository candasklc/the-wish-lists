import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon'; 
import { MatTabsModule} from '@angular/material/tabs'; 
import { MatInputModule } from '@angular/material/input'; 
import { MatCardModule } from '@angular/material/card'; 

import { AppComponent } from './app.component';
import { MainpageComponent } from './components/mainpage/mainpage.component';
import { TableComponent } from './components/table/table.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddItemComponent } from './components/add-item/add-item.component';

@NgModule({
  declarations: [
    AppComponent,
    MainpageComponent,
    TableComponent,
    AddItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatInputModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

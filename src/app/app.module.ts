import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import {Ng2FilterSearchComponent} from 'ng2-filter';
import { AppComponent } from './app.component';
import { DbService } from './db/db.service';
import { MaterialModule } from './material.module';


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(DbService),
    ReactiveFormsModule,
    FormsModule,
    MaterialModule],
  declarations: [
    Ng2FilterSearchComponent,
    AppComponent
  ],
  bootstrap: [AppComponent],
  providers: [ ]
})
export class AppModule { }

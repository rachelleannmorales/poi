import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
      HttpClientModule,
      BrowserModule,
      BrowserAnimationsModule,
      MatTableModule,
      FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

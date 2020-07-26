import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { NgImageSliderModule } from 'ng-image-slider';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { ConfirmActionModalComponent } from './confirm-action-modal/confirm-action-modal.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    ConfirmActionModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    MatIconModule,
    FormsModule,
    NgImageSliderModule,
    NgbModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatDialogModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [ConfirmActionModalComponent]
})
export class AppModule { }

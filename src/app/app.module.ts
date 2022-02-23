import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TractorComponent } from './components/tractor/tractor.component';
import { TractorFormComponent } from './components/tractor-form/tractor-form.component';
import { TractorDetailsComponent } from './components/tractor-details/tractor-details.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ImagekitioAngularModule } from 'imagekitio-angular';

import constants from '../assets/constants.json';

@NgModule({
  declarations: [
    AppComponent,
    TractorComponent,
    TractorFormComponent,
    TractorDetailsComponent,
    ToolbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ImagekitioAngularModule.forRoot({
      publicKey: constants.publicKey,
      urlEndpoint: constants.urlEndpoint,
      authenticationEndpoint: constants.authenticationEndpoint
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

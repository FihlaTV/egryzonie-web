import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APIInterceptor } from './api.interceptor';

import { SharedModule } from './shared/shared.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VetsComponent } from './vets/vets.component';
import { VetsListComponent } from './vets/vets-list/vets-list.component';
import { VetViewComponent } from './vets/vet-view/vet-view.component';

import { VetsService } from './vets/vets.service';

@NgModule({
  declarations: [
    AppComponent,
    VetsComponent,
    VetsListComponent,
    VetViewComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SharedModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: APIInterceptor,
      multi: true
    },
    VetsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

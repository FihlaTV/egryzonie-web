import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from 'environments/environment';
import { SharedModule } from '../shared/shared.module';

// Routing
import { HomeRoutingModule } from './home-routing.module';

import { HomeComponent } from './home.component';

@NgModule({
  imports: [
    HomeRoutingModule,
    CommonModule,
    SharedModule
  ],
  declarations: [
    HomeComponent
  ],
})
export class HomeModule { }
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from 'environments/environment';
import { SharedModule } from '../shared/shared.module';

// Routing
import { HomeRoutingModule } from './home-routing.module';

import { HomeComponent } from './home.component';

// Third-party
import { TooltipDirective } from 'ng2-tooltip-directive/components';

@NgModule({
  imports: [
    HomeRoutingModule,
    CommonModule,
    SharedModule
  ],
  declarations: [
    TooltipDirective,
    HomeComponent
  ],
})
export class HomeModule { }
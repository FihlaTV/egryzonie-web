import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Components
import { NavbarComponent } from '@components/navbar/navbar.component';
import { ErrorComponent } from '@components/error/error.component';
import { TooltipContentComponent } from '@components/tooltip-content/tooltip-content.component';

// Services
import { GeolocationService, GoogleMapsService } from '@services/index';

const EXPORTS = [
  NavbarComponent,
  ErrorComponent,
];

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    RouterModule
  ],
  declarations: EXPORTS,
  providers: [
    GeolocationService,
    GoogleMapsService
  ],
  exports: EXPORTS
})
export class SharedModule { }

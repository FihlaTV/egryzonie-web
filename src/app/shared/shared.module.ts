import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Pipes
import { WordNumPipe } from '@pipes/wordnum.pipe';

// Components
import { NavbarComponent } from '@components/navbar/navbar.component';
import { ErrorComponent } from '@components/error/error.component';
import { FooterComponent } from '@components/footer/footer.component';

// Services
import { GeolocationService, GoogleMapsService } from '@services/index';

const EXPORTS = [
  NavbarComponent,
  ErrorComponent,
  FooterComponent,
  WordNumPipe
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

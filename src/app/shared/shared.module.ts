import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Pipes
import { WordNumPipe } from '@pipes/wordnum.pipe';
import { ShortUrlPipe } from '@pipes/shortUrl.pipe';

// Components
import { NavbarComponent } from '@components/navbar/navbar.component';
import { ErrorComponent } from '@components/error/error.component';
import { FooterComponent } from '@components/footer/footer.component';
import { VersionComponent } from '@components/version/version.component';
import { StarRatingComponent } from '@components/star-rating/star-rating.component';

// Services
import { GeolocationService, GoogleMapsService } from '@services/index';

const EXPORTS = [
  NavbarComponent,
  ErrorComponent,
  FooterComponent,
  VersionComponent,
  StarRatingComponent,
  WordNumPipe,
  ShortUrlPipe
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

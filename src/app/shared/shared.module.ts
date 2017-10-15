import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Components
import { NavbarComponent } from '@components/navbar/navbar.component';
import { ErrorComponent } from '@components/error/error.component';

// Services
import { UserService, GeolocationService } from '@services/index';

const EXPORTS = [
  NavbarComponent,
  ErrorComponent
];

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    RouterModule
  ],
  declarations: EXPORTS,
  providers: [
    UserService,
    GeolocationService
  ],
  exports: EXPORTS
})
export class SharedModule { }

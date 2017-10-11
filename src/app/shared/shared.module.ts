import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Component
import { NavbarComponent } from '@components/navbar/navbar.component';

// Services
import { UserService, GeolocationService } from '@services/index';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    RouterModule
  ],
  declarations: [
    NavbarComponent
  ],
  providers: [
    UserService,
    GeolocationService
  ],
  exports: [
    NavbarComponent
  ]
})
export class SharedModule { }

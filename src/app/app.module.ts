import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APIInterceptor } from './api.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { environment } from 'environments/environment';

// Services
import { UserService } from '@services/user.service';
import { PetService } from '@services/pet.service';

// Guards
import { AuthGuard } from '@guards/auth.guard';

// Modules
import { SharedModule } from './shared/shared.module';
import { HomeModule } from './home/home.module';
import { AuthModule } from './auth/auth.module';
import { VetsModule } from './vets/vets.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
    AppRoutingModule,
    HomeModule,
    AuthModule,
    VetsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: APIInterceptor,
      multi: true
    },
    UserService,
    PetService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

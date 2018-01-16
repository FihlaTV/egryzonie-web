import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';

// Routing
import { AuthRoutingModule } from './auth-routing.module';

// Components
import { AuthComponent } from './auth.component';
import { UserComponent } from './user/user.component';
import { SignComponent } from './sign/sign.component';
import { SignInComponent } from './sign/sign-in/sign-in.component';
import { SignUpComponent } from './sign/sign-up/sign-up.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    SharedModule
  ],
  declarations: [
    AuthComponent,
    UserComponent,
    SignComponent,
    SignUpComponent,
    SignInComponent
  ],
  providers: [
  ]
})
export class AuthModule { }

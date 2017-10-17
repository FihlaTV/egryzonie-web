import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { UserComponent } from './user/user.component';

import { AuthGuard } from '@guards/auth.guard';

const authRoutes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'logout', component: LogoutComponent }
    ]
  },
  {
    path: 'user',
    component: AuthComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: UserComponent }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(authRoutes) ],
  exports: [ RouterModule ]
})
export class AuthRoutingModule { }
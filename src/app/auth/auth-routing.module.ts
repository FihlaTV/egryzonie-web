import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthComponent } from './auth.component';
import { UserComponent } from './user/user.component';
import { SignComponent } from './sign/sign.component';

import { AuthGuard } from '@guards/auth.guard';

const authRoutes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'sign', component: SignComponent }
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
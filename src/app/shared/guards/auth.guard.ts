import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from '@services/user.service';
import { User } from '@interfaces/user';

@Injectable()
export class AuthGuard implements CanActivate {
  public currentUser: User;
  
  constructor ( private _router: Router, private _user: UserService ) {
    _user.currentUser$.subscribe((user) => this.currentUser = user);
  }
  
  canActivate() {
    if (this.currentUser) {
      return true;
    }

    this._router.navigate(['/auth/login']);
    return false;
  }
}

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor ( private _router: Router ) {}
  
  canActivate() {
    if (localStorage['currentUser']) {
      return true;
    }

    this._router.navigate(['/login']);
    return false;
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '@services/user.service';
import { User } from '@interfaces/user';

@Component({
  template: '',
  styles: ['']
})
export class LogoutComponent implements OnInit {
  public currentUser: User;
  
  constructor(
    private _user: UserService,
    private _router: Router
  ) {
    _user.currentUser$.subscribe((user) => this.currentUser = user);
  }

  ngOnInit() {
    if (this.currentUser) {
      this._user.logout();
      this._router.navigate(['/']);
    }
  }
}
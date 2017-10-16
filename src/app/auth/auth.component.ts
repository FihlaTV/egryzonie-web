import { Component, OnInit } from '@angular/core';
import { UserService } from '@services/index';

@Component({
  selector: 'eg-auth',
  template: `<router-outlet></router-outlet>`,
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  public currentUser;

  constructor( private _user: UserService ) {
    _user.currentUser$.subscribe((user) => this.currentUser = user);
  }

  ngOnInit() {
  }
}

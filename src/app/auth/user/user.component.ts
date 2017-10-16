import { Component, OnInit } from '@angular/core';
import { UserService } from '@services/user.service';
import { User } from '@interfaces/user';

@Component({
  template: `User Works!`,
  styles: ['p { color: red; }']
})
export class UserComponent implements OnInit {
  public currentUser: User;

  constructor (private _user: UserService) {
    _user.currentUser$.subscribe((user) => {
      this.currentUser = user;
    });
  }
  
  ngOnInit() {

  }
}
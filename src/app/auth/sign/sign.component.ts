import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@interfaces/index';
import { UserService } from '@services/user.service';

@Component({
  selector: 'eg-sign',
  template: `
    <div class="sign">
      <eg-sign-in></eg-sign-in>
      <eg-sign-up></eg-sign-up>
    </div>
  `,
  styleUrls: ['./sign.component.scss']
})
export class SignComponent implements OnInit {
  public user: User;
  
  private _currentUser;

  constructor(private _user: UserService, private _router: Router) {}

  ngOnInit() {
    this._currentUser = this._user.currentUser$.subscribe((user: User) => {
      this.user = user;
    });

    if (this.user) {
      this._router.navigate(['/']);
    }
  }
}
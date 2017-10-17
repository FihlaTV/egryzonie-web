import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { UserService } from '@services/index';
import { Subscription } from 'rxjs/Subscription';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { User } from '@interfaces/user';

@Component({
  selector: 'eg-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'eg';

  private _userSub: Subscription;
  public currentUser: User;

  constructor( private _user: UserService, private cdRef: ChangeDetectorRef ) { }

  ngOnInit () {
    this._userSub = this._user.currentUser$.subscribe((user) => {
      this.currentUser = user;
    });
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  ngOnDestroy () {
    // this._userSub.unsubscribe();
  }
  
  logout() {
    this._user.logout();
  }
}

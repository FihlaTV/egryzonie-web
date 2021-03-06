import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { UserService, GeolocationService } from '@services/index';
import { User } from '@interfaces/user';

import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'eg-pets',
  template: '',
  styles: []
})
export class PetsComponent implements OnInit {

  public currentUser$;

  constructor(
    private _user: UserService,
    private _geo: GeolocationService,
    private _http: Http
  ) { }

  ngOnInit() {
    this.currentUser$ = this._user.currentUser$;
  }

}

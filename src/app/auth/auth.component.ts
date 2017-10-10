import { Component, OnInit } from '@angular/core';
import { UserService } from '@services/index';

@Component({
  selector: 'eg-auth',
  template: `<p>Auth Component Works!</p>`,
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  constructor( private _user: UserService ) {}

  ngOnInit() { }
}
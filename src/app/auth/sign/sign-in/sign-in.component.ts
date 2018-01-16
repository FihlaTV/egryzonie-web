import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@interfaces/user';
import { UserService } from '@services/user.service';

@Component({
  selector: 'eg-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  constructor(private _user: UserService, private _router: Router) {}

  ngOnInit() {
    console.log('Sign In Component works!');
  }
}
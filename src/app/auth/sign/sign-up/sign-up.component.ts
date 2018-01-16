import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@interfaces/user';
import { UserService } from '@services/user.service';

@Component({
  selector: 'eg-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  constructor(private _user: UserService, private _router: Router) {}

  ngOnInit() {
    console.log('Sign Up Component works!');
  }
}
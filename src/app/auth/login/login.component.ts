import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '@services/user.service';

@Component({
  selector: 'eg-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public form: FormGroup;

  public currentUser;

  constructor (
    @Inject(FormBuilder) private _fb: FormBuilder,
    private _user: UserService,
    private _router: Router
  ) {
    this.form = _fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this._user.currentUser$.subscribe((user) => {
      this.currentUser = user;
      if (this.currentUser) {
        this._router.navigate(['/user']);
      }
    });
  }

  async login() {
    const email = this.form.controls['email'].value;
    const password = this.form.controls['password'].value;

    await this._user.login(email, password);
  }
}

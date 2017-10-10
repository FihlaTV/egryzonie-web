import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { UserService } from '@services/user.service';
import { User } from '@interfaces/user';

@Component({
  selector: 'eg-vets',
  template: `
    <p>
      vets Works!
    </p>
  `,
  styles: []
})
export class VetsComponent implements OnInit {

  public currentUser$: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  constructor( private _user: UserService ) { }

  ngOnInit() {
    this.currentUser$ = this._user.currentUser$;
  }

}

import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { environment } from 'environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';
import 'rxjs/add/operator/map';

import { User } from '@interfaces/user';

@Injectable()
export class UserService {

  public token: string;
  public currentUser$: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  constructor ( private _http: Http ) {
    if (localStorage['currentUser']) {
      const { id, email, role, token } = JSON.parse(localStorage['currentUser']);
      this.currentUser$.next(<User>{
        id: id,
        email: email,
        role: role
      });
    }
  }

  login (email: string, password: string): Observable<boolean> {
    return this._http.post(
        `${environment.apiUrl}/auth/login`,
        { email: email, password: password }
      )
      .map((response: any) => {
        const responseJson = JSON.parse(response['_body']);
        const token = responseJson && responseJson.token;
        const user = responseJson && responseJson.user;
        if (token) {
          this.token = token;
          localStorage['currentUser'] = JSON.stringify({ id: user.id, email: user.email, token: token });
          this.currentUser$.next(user);
          return true;
        }
        return false;
      }
    );
  }

  logout (): void {
    this.token = null;
    localStorage.removeItem('currentUser');
    this.currentUser$.next(null);
  }

  getUser (): Observable<User> {
    const headers = new Headers({ 'Authorization': `Bearer ${this.token}`});
    const options = new RequestOptions({ headers: headers });

    return this._http.get('http://localhost:3000/auth/user', options)
      .map((response: Response) => {
        if (response.status !== 401 && response['_body']) {
          this.currentUser$.next(JSON.parse(response['_body']));
          return response.json();
        } else {
          return null;
        }
      });
  }

}

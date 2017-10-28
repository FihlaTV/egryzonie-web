import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { environment } from 'environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';
import 'rxjs/add/operator/map';

import { User } from '@interfaces/user';

@Injectable()
export class UserService {

  public token: string;
  public currentUser$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

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

  login (email: string, password: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      return this._http.post(
        `${environment.apiUrl}/auth/login`,
        { email: email, password: password }
      )
      .map((response: any) => JSON.parse(response['_body']))
      .subscribe(
        (responseJson) => {
          if (responseJson) {
            const { token, user } = responseJson;
            if (token) {
              this.token = token;
              const userInstance: User = {
                id: user.id,
                email: user.email,
                role: user.role
              };
              if (userInstance) {
                localStorage['currentUser'] = JSON.stringify({ id: user.id, email: user.email, role: user.role, token: token });
              }
              this.currentUser$.next(userInstance);
              resolve(true);
            }
          }
        },
        (error) => {
          console.error('ERROR: ', error);
        }
      );
    });
  }

  logout (): void {
    this.currentUser$.next(null);
    this.token = null;
    localStorage.removeItem('currentUser');
  }

  getUser (): Observable<User> {
    const headers = new Headers({ 'Authorization': `Bearer ${this.token}`});
    const options = new RequestOptions({ headers: headers });

    return this._http.get(`${environment.apiUrl}/auth/user`, options)
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

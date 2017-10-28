import { Injectable, Inject, forwardRef } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpResponse, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from 'environments/environment';
import { UserService } from '@services/index';

@Injectable()
export class APIInterceptor implements HttpInterceptor {
  constructor (@Inject(forwardRef(() => UserService)) private _user: UserService) { }

  intercept (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const url = environment.apiUrl;
    const token = this._user.token || '';
    const apiReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${this._user.token}`),
      url: url + req.url
    });
    return next.handle(apiReq);
  }
}
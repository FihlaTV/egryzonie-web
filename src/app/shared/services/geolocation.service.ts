import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Coordinates } from '@interfaces/coordinates';
import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class GeolocationService {
  constructor( private _http: Http ) {}

  getCurrentPosition(): Observable<Position> {
    return Observable.create((observer: Observer<Position>) => {
      navigator.geolocation.getCurrentPosition(
        (coordinates: Position) => {
          observer.next(coordinates);
          observer.complete();
        },
        (error: PositionError) => {
          console.error('Geolocation service error: ', error.message);
        }
      );
    });
  }

  getUserLocation(): Promise<object> {
    return new Promise((resolve, reject) => {
      if (localStorage.userLocation) {
        resolve(JSON.parse(localStorage.userLocation));
      }
      this._http.get('https://geoip-db.com/json')
        .map((response) => JSON.parse(response['_body']))
        .subscribe((results) => {
          if (results) {
            localStorage.userLocation = JSON.stringify(results);
            resolve(results);
          } else {
            reject(null);
          }
        });
    });
  }
}

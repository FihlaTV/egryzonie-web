import { Injectable } from '@angular/core';
import { Coordinates } from '@interfaces/coordinates';
import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class GeolocationService {
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
}

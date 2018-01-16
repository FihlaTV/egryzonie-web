import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Coordinates } from '@interfaces/index';
import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';
import { environment } from 'environments/environment';

declare const google: any;

@Injectable()
export class GeolocationService {
  constructor( private _http: Http ) {}

  getUserLocation(): Promise<Coordinates> {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          resolve(<Coordinates>{
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        });
      } else {
        reject('Przeglądarka nie obsługuje funkcji lokalizacji.')
      }
    });
  }

  locationByPlaceID(id: string): Promise<Location> {
    return new Promise((resolve, reject) => {
      try {
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({
          placeId: id
        }, (results, status) => {
          const coordinates: Coordinates = {
            lat: results[0].geometry.location.lat(),
            lng: results[0].geometry.location.lng()
          };
          resolve(location);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  getCityLocation(name): Promise<Coordinates> {
    return new Promise((resolve, reject) => {
      try {
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({
          address: name,
          componentRestrictions: {
            country: 'PL'
          }
        }, (results, status) => {
          if (status === 'OK') {
            const cities = results.filter((r) => {
              return r.types.indexOf('country') === -1;
            });
            if (!cities.length) {
              resolve(null);
            }

            const coordinates: Coordinates = {
              lat: parseFloat(results[0].geometry.location.lat().toFixed(6)),
              lng: parseFloat(results[0].geometry.location.lng().toFixed(6))
            };
            resolve(coordinates)
          } else {
            resolve(null);
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  }
}

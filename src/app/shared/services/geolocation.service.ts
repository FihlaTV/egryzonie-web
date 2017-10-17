import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Location, Coordinates } from '@interfaces/index';
import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';
import { environment } from 'environments/environment';

declare const google: any;

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

  getUserLocation(): Promise<Location> {
    return new Promise((resolve, reject) => {
      if (localStorage.userLocation) {
        resolve(JSON.parse(localStorage.userLocation));
      }
      this._http.get('https://geoip-db.com/json')
        .map((response) => JSON.parse(response['_body']))
        .subscribe((results) => {
          if (results) {
            const location: Location = {
              city: results.city,
              coords: {
                lat: results.latitude,
                lng: results.longitude
              }
            };
            localStorage.userLocation = JSON.stringify(location);
            resolve(location);
          } else {
            reject(null);
          }
        });
    });
  }

  locationByPlaceID(id: string): Promise<Location> {
    return new Promise((resolve, reject) => {
      try {
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({
          placeId: id
        }, (results, status) => {
          console.log(results, status);
        });
      } catch (error) {
        console.error('Error!', error);
      }
    });
  }

  getCityLocation(name): Promise<Location> {
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

            const location: Location = {
              city: results[0].address_components[0].long_name,
              coords: {
                lat: results[0].geometry.location.lat(),
                lng: results[0].geometry.location.lng()
              }
            };
            resolve(location)
          } else {
            resolve(null);
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  getNearbyCities(location: Location): Promise<Location[]> {
    return new Promise((resolve, reject) => {
      try {
        const offset = 0.35;
        const cities = this._http.get(`http://api.geonames.org/citiesJSON?north=${location.coords.lat+offset}&south=${location.coords.lat-offset}&west=${location.coords.lng-offset}&east=${location.coords.lng+offset}&lang=pl&maxRows=5&username=${environment.geonamesUsername}`)
          .map((response) => {
            const cities = JSON.parse(response['_body']).geonames;
            return cities
              .map((city) => {
                const location: Location = {
                  city: city.name,
                  coords: {
                    lat: city.lat,
                    lng: city.lng
                  }
                };
                return location;
              })
              .filter((city) => {
                return city.city !== location.city
              });
          })
          .subscribe(
            (results) => {
              resolve(results);
            },
            (error) => {
              reject(error.message);
            });
      } catch (error) {
        reject(error);
      }
    });
  }
}

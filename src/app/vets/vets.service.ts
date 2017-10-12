import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

import { Observable } from 'rxjs/Observable';

import { GeolocationService } from '@services/geolocation.service';

import { Vet } from '@interfaces/vet';

@Injectable()
export class VetsService {
  constructor (
    private _http: HttpClient,
    private _regularHttp: Http,
    private _geo: GeolocationService
  ) {}

  recommendedInCity(city: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this._http.post('/vets/search_city', {
        city: city
      }).subscribe(
        (results) => {
          resolve(results);
        }),
        (error) => {
          reject(error);
        }
    });
  }

  othersAround(latitude: number, longitude: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this._regularHttp.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${environment.googleKey}&location=${latitude},${longitude}&radius:25000&rankby=distance&types=veterinary_care`)
        .map((response) => JSON.parse(response['_body']).results)
        .subscribe(
          (results) => {
            resolve(results);
          },
          (error) => {
            reject(error);
          });
    });
  }
}
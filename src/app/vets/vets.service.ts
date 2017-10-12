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

  findVetsInCity(city: string): Promise<any> {
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
}
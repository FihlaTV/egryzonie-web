import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

import { Observable } from 'rxjs/Observable';

import { GeolocationService } from '@services/geolocation.service';
import { Location } from '@interfaces/location';
import { Vet } from '@interfaces/vet';

@Injectable()
export class VetFetchService {
  constructor (
    private _http: HttpClient,
    private _regularHttp: Http,
    private _geo: GeolocationService
  ) {}

  getVetDetails(vetId: number): Promise<any> {
    const requestUrl = `/vets/view/${vetId}`;
    return new Promise((resolve, reject) => {
      this._http.get(requestUrl).subscribe(
        (results) => {
          resolve(results);
        },
        (error) => {
          console.error(error);
          reject(error);
        }
      );
    });
  }

  recommendedInLocation(location: Location): Promise<Vet[]> {
    return new Promise((resolve, reject) => {
      this._http.post('/vets/search_city', {
        city: location.city
      }).subscribe(
        (results: Vet[]) => {
          resolve(results);
        }),
        (error) => {
          reject(error);
        }
    });
  }

  othersInLocation(location: Location, recommended?: Vet[]): Promise<Vet[]> {
    return new Promise((resolve, reject) => {
      this._regularHttp.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${environment.googleKey}&location=${location.coords.lat},${location.coords.lng}&radius:25000&rankby=distance&types=veterinary_care`)
        .map((response) => JSON.parse(response['_body']).results)
        .subscribe(
          (results) => {
            resolve(results
              .map((item) => this._googleResultToVet(item, location.city))
              .filter((item) => !recommended || recommended.find((r) => item === r) !== null)
            );
          },
          (error) => {
            reject(error);
          });
    });
  }

  private _googleResultToVet(result: any, city?: string): Vet {
    return <Vet>{
      title: result.name,
      address: result.vicinity,
      googleMapsID: result.place_id,
      city: city || '',
      location: <Location>{ city: city || '', coords: { lat: result.geometry['location'].lat, lng: result.geometry['location'].lng }}
    };
  }
}
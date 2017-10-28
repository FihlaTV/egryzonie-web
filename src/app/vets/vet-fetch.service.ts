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
        (results: any[]) => {
          const vets: Vet[] = results.map((item) => {
            item.location = <Location>{ city: location.city, coords: { lat: item.lat, lng: item.lng } };
            return item;
          });
          resolve(vets);
        }),
        (error) => {
          reject(error);
        }
    });
  }

  othersInLocation(location: Location, recommended?: Vet[]): Promise<Vet[]> {
    return new Promise((resolve, reject) => {
      this._regularHttp.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${environment.googleKey}&location=${location.coords.lat},${location.coords.lng}&radius:25000&rankby=distance&types=veterinary_care`)
        .map((response) => {
          const json = JSON.parse(response['_body']).results;
          if (recommended) {
            return json.filter((o) => !recommended.find((r) => r.googleMapsID === o.place_id));
          }
          return json;
        })
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
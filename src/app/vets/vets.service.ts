import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

import { Observable } from 'rxjs/Observable';

import { Vet } from '@interfaces/vet';

@Injectable()
export class VetsService {
  constructor (
    private _http: HttpClient,
    private _regularHttp: Http
  ) {}

  getSavedVets(vets: any[]): Observable<any> {
    console.log('Get Saved Vets');
    return new Observable<any>((observer) => {
      this._http.post('/vets/search', {
        places: vets
      })
        .subscribe(
          (results) => {
            observer.next(results);
            observer.complete();
          },
          (error) => {
            observer.error(error);
          });
    });
  }

  getNearbyVets(coordinates): Observable<any> {
    const { latitude, longitude } = coordinates.coords;
    return new Observable<any>((observer) => {
      const requestUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${environment.googleKey}&location=${latitude},${longitude}&radius=20000&type=veterinary_care`;
      console.log(requestUrl);
      this._regularHttp.get(requestUrl)
        .subscribe((results) => {
          const vetsList = [];
          for (let vet of JSON.parse(results['_body']).results) {
            vetsList.push({
              id: vet['id'],
              title: vet['name'],
              address: vet['vicinity'],
              googleMapsID: vet['place_id']
            });
          }

          observer.next(vetsList);
        });
    });
  }
}
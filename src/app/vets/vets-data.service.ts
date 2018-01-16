import { Injectable, Inject, forwardRef } from '@angular/core';
import { Http, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

import { Location, Coordinates } from '@interfaces/index';
import { Vet } from '@interfaces/vet';

export class VetsDataService {
  public radius: number = 10000;

  // { vetId: string, recommended: boolean }
  private _currentVet: Vet;

  private _currentVetData: BehaviorSubject<Vet> = new BehaviorSubject<Vet>(null);
  private _vetsData: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private _isLoading: BehaviorSubject<boolean> = new BehaviorSubject<any>(true);

  constructor (
    @Inject(forwardRef(() => HttpClient)) private _http: HttpClient,
    @Inject(forwardRef(() => Http)) private _regularHttp: Http
  ) {}

  set currentVet(vet: Vet) {
    this._currentVet = vet;
    this._currentVetData.next(this._currentVet);
  }

  get currentVet(): Vet {
    return this._currentVet;
  }

  observeCurrentVetData(): Observable<Vet> {
    return this._currentVetData.asObservable();
  }
  
  async fetchVetDetails(data: any): Promise<null> {
    if (!data) return;
  
    try {
      this.currentVet = (data.recommended)
        ? await this._fetchRecommendedDetails(data.id)
        : await this._fetchOthersDetails(data.id);
    } catch (error) {
      console.error('Error: ', error);
    }
  }
  
  async fetchVetsInRange(coordinates: Coordinates) {
    if (!coordinates) return;
  
    try {
      const recommended = await this._fetchRecommendedInRange(coordinates);
      const others = await this._fetchOthersInRange(coordinates);
      this._vetsData.next({ recommended, others });
    } catch (error) {
      console.error('ERROR: ', error);
    }
  }
  
  fetchIsSuggested(gmapsId: any): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const request = this._http.get(`vets/suggestion_check/${gmapsId}`)
        .subscribe(
          (response: Response) => response.status === 203 ? resolve(true) : resolve(false),
          (error: any) => reject(error),
          () => request.unsubscribe()
        );
      });
    }

  recommend(vet: Vet) {
    if (!vet || vet.recommended) return;

    try {
      this._http.post('/vets/suggest/', { ...vet, lat: vet.position.lat, lng: vet.position.lng })
        .subscribe(
          (response) => console.log('Server response: ', response),
          (error) => console.error('Error', error),
          () => console.log('Request complete')
        );
    } catch (error) {
      console.error('Error: ', error);
    }
  }

  observeVetsList(): Observable<any> {
    return this._vetsData.asObservable();
  }

  observeLoading() {
    return this._isLoading.asObservable();
  }

  castLoading(value: boolean) {
    this._isLoading.next(value);
  }

  private _fetchRecommendedDetails(id: any): Promise<any> {
    return new Promise((resolve, reject) => {
      resolve(0);
    });
  }

  private _fetchOthersDetails(id: any): Promise<Vet> {
    return this._regularHttp.get(`https://maps.googleapis.com/maps/api/place/details/json?key=${environment.googleKey}&placeid=${id}`)
      .map((response: any) => {
        return this._convertToVet(JSON.parse(response['_body']).result);
      })
      .toPromise();
  }

  private _fetchRecommendedInRange(coordinates: Coordinates): Promise<Vet[]> {
    return new Promise((resolve, reject) => {
      this._http.get(`/vets/search_within_range/${this.radius}/${coordinates.lat}/${coordinates.lng}`)  
        .map((response: any[]) => {
          return response.map((r) => <Vet>r);
        })
        .subscribe(
          (results: any) => resolve(results),
          (error) => reject(error)
        );
    })
  }


  private _fetchOthersInRange(coordinates: Coordinates, recommended: Vet[] = []): Promise<Vet[]> {
    const requestUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${environment.googleKey}&location=${coordinates.lat},${coordinates.lng}&radius:${this.radius}&rankby=distance&types=veterinary_care`;
    return new Promise((resolve, reject) => {
      this._regularHttp.get(requestUrl)
        .map((response: Response) =>
          JSON.parse(response['_body']).results.map(
            (r: any) => this._convertToVet(r)
          ))
        .map((data) => data.filter((o) => !recommended.find((r) => r.googleMapsID === o.place_id)))
        .distinctUntilChanged()
        .subscribe(
          (results) => resolve(results),
          (error) => reject(error)
        )
    });
  }

  private _convertToVet(item: any): Vet {
    return <Vet>{
      id: item.googleId || null,
      title: item.name || '',
      address: item.vicinity || '',
      googleMapsID: item.place_id || '',
      position: { lat: item.geometry.location.lat, lng: item.geometry.location.lng } || null,
      phone: item.formatted_phone_number || '',
      websiteUrl: item.website || '',
      openingHours: item.opening_hours.weekday_text || [],
      recommended: item.recommended || false
    }
  }
}
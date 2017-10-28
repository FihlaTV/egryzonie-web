import { Injectable, Inject, forwardRef } from '@angular/core';
import { Location, Vet, VetsList } from '@interfaces/index';
import { GeolocationService } from '@services/geolocation.service';
import { VetFetchService } from './vet-fetch.service';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class VetSearchService {
  public vets: VetsList;
  public currentLocation: Location;

  private _location: BehaviorSubject<Location> = new BehaviorSubject<Location>(null);
  private _mapViewLocation: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private _vetsLists: BehaviorSubject<VetsList> = new BehaviorSubject<VetsList>(null);
  public currentVet: Vet;

  constructor (
    @Inject(forwardRef(() => GeolocationService)) private _geo: GeolocationService,
    private _fetch: VetFetchService
  ) {
    this._initialize();
  }

  /**
   * Returns vets data as an Observable.
   */
  public getVetsData(): Observable<VetsList> {
    return this._vetsLists.asObservable();
  }

  /**
   * Fetches vets lists for current location
   */
  async fetchVetsData() {
    try {
      const recommended = await this._fetch.recommendedInLocation(this.currentLocation);
      const others = await this._fetch.othersInLocation(this.currentLocation, recommended);
      this._vetsLists.next(<VetsList>{ recommended: recommended, others: others });
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Sends data to the map handler with the info what object it should zoom the map at.
   * @param location Locatiom to zoom the map at.
   * @param zoom Zoom level.
   */
  zoomAt(location: Location, zoom: number) {
    this._mapViewLocation.next({ location, zoom });
  }

  /**
   * Returns the map's center and zoom data as an Observable.
   */
  getMapView() {
    return this._mapViewLocation.asObservable();
  }

  /**
   * Returns the current location data as an Observable.
   */
  getLocation() {
    return this._location.asObservable();
  }

  /**
   * Sets a new location data to current location.
   * @param location New current location
   */
  setLocation(location: Location) {
    this.currentLocation = location;
    this._location.next(this.currentLocation);
    this.fetchVetsData();
    this.zoomAt(location, 10);
  }

  /**
   * Creates default current location data from either localStorage or user's Geolocation data.
   */
  private async _initialize() {
    try {
      if (sessionStorage['vetCitySearch']) {
        const city = sessionStorage['vetCitySearch'];
        this.currentLocation = await this._geo.getCityLocation(sessionStorage['vetCitySearch']);
      } else {
        // this.currentLocation = await this._geo.getUserLocation();
        this.currentLocation = { city: 'Wronki', coords: { lat: 52.705311, lng: 16.38086 } };
      }
      this.setLocation(this.currentLocation);
      this.fetchVetsData();
    } catch (error) {
      console.error(error);
    }
  }
}
import { Component, OnInit } from '@angular/core';
import { GeolocationService } from '@services/geolocation.service';
import { Location } from '@interfaces/location';

@Component({
  template: ``
})
export class GeocoderComponent implements OnInit {
  constructor( private _geo: GeolocationService ) {}

  async ngOnInit() {
    const userLocation = await this._geo.getUserLocation();
  }
}
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { GeolocationService, GoogleMapsService } from '@services/index';
import { Vet } from '@interfaces/vet';
import { VetSearchService } from '../vet-search.service';

import { Location } from '@interfaces/location';

import { Subscription } from 'rxjs/Subscription';

declare const google: any;

@Component({
  selector: 'eg-vets-map',
  template: '<div id="map"></div>',
  // templateUrl: './vets-map.component.html',
  styleUrls: ['./vets-map.component.scss']
})
export class VetsMapComponent implements OnInit, OnDestroy {
  @Input() vets: any;

  public selectedVet: Vet;

  public location: Location;
  public zoom: number = 12;
  public mapStyles: object;

  private location$: Subscription;
  private mapView$: Subscription;
  
  constructor(
    private _gmaps: GoogleMapsService,
    private _search: VetSearchService
  ) {
    this.mapStyles = this._gmaps.mapStyles;
  }

  ngOnInit() {
    this.mapView$ = this._search.getMapView().subscribe((mapView) => {
      this.location = mapView.location;
      this.zoom = mapView.zoom;

      const map = document.getElementById('map');
      // const markers = this.vets.recommended.map((item) => {
      //   return new google.maps.Marker({
      //     position: new google.maps.LatLng(item.location.coords.lat, item.location.coords.lng),
      //     map: map
      //   });
      // });
      this._gmaps.initMap(map, this.location);
    })
  }

  center(location, zoom) {
    this.location = location;
    this.zoom = zoom;
  }

  ngOnDestroy() {
    this.location$.unsubscribe();
  }
}
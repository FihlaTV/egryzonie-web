import { Component, OnInit, OnDestroy, Input, HostListener } from '@angular/core';
import { GeolocationService, GoogleMapsService } from '@services/index';
import { Vet } from '@interfaces/vet';
import { VetsDataService } from '../vets-data.service';
import { Coordinates } from '@interfaces/coordinates';
import { Subscription } from 'rxjs/Subscription';

declare const google: any;

@Component({
  selector: 'eg-vets-map',
  template: `
    <p class="error" *ngIf="error">{{ error }}</p>
    <div id="map"></div>
  `
})
export class VetsMapComponent implements OnInit, OnDestroy {
  @Input() vets: any;

  public selectedVet: Vet;

  public coordinates: Coordinates;
  public zoom: number = 12;
  public mapStyles: object;

  public error: string = null;

  private _location$: Subscription;
  private _mapView$: Subscription;
  private _vets$: Subscription;
  private _markers$: Subscription;
  
  constructor(
    private _geo: GeolocationService,
    private _gmaps: GoogleMapsService,
    private _vets: VetsDataService
  ) {
    this.mapStyles = this._gmaps.mapStyles;
  }

  async ngOnInit() {
    this.coordinates = await this._geo.getUserLocation();
    const map = document.getElementById('map');
    await this._gmaps.initMap(map, this.coordinates);
    this._watchMapMovement();
    this._watchMarkers();
    this._watchVetsData();
  }

  center(coordinates: Coordinates, zoom: number) {
    this.coordinates = coordinates;
    this.zoom = zoom;
  }

  ngOnDestroy() {
    this._location$.unsubscribe();
    this._markers$.unsubscribe();
    this._vets$.unsubscribe();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this._gmaps.resize();
  }

  private _watchMarkers() {
    this._markers$ = this._gmaps.markerClicks()
      .subscribe((marker) => this._vets.currentVet = marker ? marker['vet'] : null);
  }

  private _watchMapMovement() {
    const diff = 0.001;
    this._location$ = this._gmaps.location()
      .distinctUntilChanged((x, y) => {
        const latDiff = Math.abs(x.lat - y.lat);
        const lngDiff = Math.abs(x.lng - y.lng);
        return latDiff < diff && lngDiff < diff;
      })
      .debounceTime(500)
      .subscribe((coordinates: Coordinates) => this._vets.fetchVetsInRange(coordinates));
  }

  private _watchVetsData() {
    this._vets$ = this._vets.observeVetsList()
      .distinctUntilChanged()
      .debounceTime(500)
      .subscribe((vets) => {
        if (vets && vets.recommended && vets.others) {
          this._gmaps.clearMarkers();
          const markers = [
            { items: this._fetchPositions(vets.recommended), icon: 'map-marker-yellow.svg' },
            { items: this._fetchPositions(vets.others), icon: 'map-marker-black.svg' }
          ];
          this._gmaps.placeMarkers(markers);
        }
      });
  }

  private _fetchPositions(vets: Vet[]) {
    return vets.map((item) => {
      return { position: new google.maps.LatLng(item['position']['lat'], item['position']['lng']) }
    });
  }
}
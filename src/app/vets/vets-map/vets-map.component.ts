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
    this._handleMapMovement();
  }

  center(coordinates: Coordinates, zoom: number) {
    this.coordinates = coordinates;
    this.zoom = zoom;
  }

  ngOnDestroy() {
    if (this._location$) {
      this._location$.unsubscribe();
    }
    if (this._markers$) {
      this._markers$.unsubscribe();
    }
    if (this._vets$) {
      this._vets$.unsubscribe();
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this._gmaps.resize();
  }

  private _handleMarkers() {
    this._markers$ = this._gmaps.markerClicks()
      .distinctUntilChanged()
      .debounceTime(1000)
      .subscribe((marker) => {
        this._vets.currentVet = marker ? marker['vet'] : null;
      });
  }

  private _handleMapMovement() {
    this._location$ = this._gmaps.location()
      .distinctUntilChanged()
      .debounceTime(2000)
      .subscribe((coordinates: Coordinates) => {
        if (coordinates) {
          this._vets$ = this._vets.vetsInRange(coordinates).subscribe(
            (vets) => {
              if (vets && vets.recommended && vets.others) {
                this._gmaps.placeMarkers(this._fetchPositions(vets.recommended), 'map-marker-yellow.svg');
                this._gmaps.placeMarkers(this._fetchPositions(vets.others), 'map-marker-black.svg');
                this._handleMarkers();
              }
            }
          )
        }
      });
  }

  private _fetchPositions(vets: Vet[]) {
    return vets.map((item) => {
      return { position: new google.maps.LatLng(item['position']['lat'], item['position']['lng']), vet: item }
    });
  }
}
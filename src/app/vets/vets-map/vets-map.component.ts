import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { GeolocationService, GoogleMapsService } from '@services/index';
import { Vet } from '@interfaces/vet';
import { VetSearchService } from '../vet-search.service';
import { Location } from '@interfaces/location';
import { Subscription } from 'rxjs/Subscription';

declare const google: any;

@Component({
  selector: 'eg-vets-map',
  template: `
    <p class="error" *ngIf="error">{{ error }}</p>
    <div id="map"></div>
  `,
  styleUrls: ['./vets-map.component.scss']
})
export class VetsMapComponent implements OnInit, OnDestroy {
  @Input() vets: any;

  public selectedVet: Vet;

  public location: Location;
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
    private _search: VetSearchService
  ) {
    this.mapStyles = this._gmaps.mapStyles;
  }

  async ngOnInit() {
    const userLocation = await this._geo.getUserLocation();
    const map = document.getElementById('map');
    await this._gmaps.initMap(map, userLocation);

    this._mapView$ = this._search.getMapView().subscribe(async (mapView) => {
      this.location = mapView.location;
      this.zoom = mapView.zoom;
      this._gmaps.center(this.location, this.zoom);

      try {
        this._vets$ = this._search.getVetsData().subscribe((vets) => {
          if (vets) {
            const recommended = this._fetchPositions(vets.recommended);
            const others = this._fetchPositions(vets.others);
            this._gmaps.placeMarkers(recommended, 'map-marker-yellow.svg');
            this._gmaps.placeMarkers(others, 'map-marker-black.svg');
          }
        });
      } catch (error) {
        const errorMessage = 'Błąd podczas inicjacji mapy. Sprawdź połączenie internetowe.';
        console.error(`${errorMessage} (${error})`);
        this.error = errorMessage;
      }
    });
    this._gmaps.markerClicks().subscribe((marker) => {
      if (marker) {
        this._search.currentVet = marker['vet'];
      }
    });
  }

  center(location, zoom) {
    this.location = location;
    this.zoom = zoom;
  }

  ngOnDestroy() {
    if (this._location$) {
      this._location$.unsubscribe();
    }
  }

  private _fetchPositions(vets: Vet[]) {
    return vets.map((item) => {
      return { position: new google.maps.LatLng(item.location.coords.lat, item.location.coords.lng), vet: item }
    });
  }
}
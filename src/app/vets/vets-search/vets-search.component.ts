import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { UserService, GeolocationService, GoogleMapsService } from '@services/index';
import { Coordinates } from '@interfaces/coordinates';
import { Vet } from '@interfaces/vet';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';

import { VetsDataService } from '../vets-data.service';

@Component({
  selector: 'eg-vets-search',
  templateUrl: './vets-search.component.html',
  styleUrls: ['./vets-search.component.scss']
})
export class VetsSearchComponent implements OnInit, OnDestroy {
  @Input() vets: object;
  @Output() public onLocationSearch: EventEmitter<Location> = new EventEmitter<Location>();

  public coordinates: Coordinates;
  public searchAwait: boolean = false;
  public searchBoxTypeSubject = new Subject<any>();
  public searchValue: string;

  private _searchBoxType$: Subscription;
  private _location$: Subscription;

  public error: string;
  public show: {} = {
    recommended: true,
    others: false
  };

  constructor(
    private _user: UserService,
    private _geo: GeolocationService,
    private _vets: VetsDataService,
    private _gmaps: GoogleMapsService
  ) {}

  ngOnInit() {
    this._location$ = this._gmaps.location()
      .distinctUntilChanged()
      .debounceTime(500)
      .subscribe((coordinates: Coordinates) => this.coordinates = coordinates);
    this._initSearchBox();
  }

  ngOnDestroy() {
    if (this._searchBoxType$) {
      this._searchBoxType$.unsubscribe();
    }
  }

  private _initSearchBox() {
    this._searchBoxType$ = this.searchBoxTypeSubject
      .map((event) => event.target.value)
      .debounceTime(500)
      .distinctUntilChanged()
      .flatMap((search) => {
        this.searchAwait = true;
        return Observable.of(search).delay(500);
      })
      .subscribe((search) => {
        this._doSearch(search);
      });
  }

  private async _doSearch(search: string) {
    try {
      const location = await this._geo.getCityLocation(search);
      this.searchAwait = false;
      if (!location) {
        this._error('Nie ma takiej miejscowości.');
      } else {
        this._error(null);
        this._gmaps.go(location, 12);
      }
    } catch (error) {
      this._error('Wystąpił błąd podczas wyszukiwania podanej miejscowości.');
    }
  }

  private _error(txt: string|null) {
    if (txt) {
      console.error(txt);
    }
    this.error = txt;
  }
}
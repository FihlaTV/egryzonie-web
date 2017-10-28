import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { UserService, GeolocationService } from '@services/index';
import { Location } from '@interfaces/location';
import { Vet } from '@interfaces/vet';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';

import { VetSearchService } from '../vet-search.service';

@Component({
  selector: 'eg-vets-search',
  templateUrl: './vets-search.component.html',
  styleUrls: ['./vets-search.component.scss']
})
export class VetsSearchComponent implements OnInit, OnDestroy {
  @Input() location: Location;
  @Input() vets: object;
  @Output() public onLocationSearch: EventEmitter<Location> = new EventEmitter<Location>();

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
    private _search: VetSearchService
  ) {}

  ngOnInit() {
    this._location$ = this._search.getLocation().subscribe((location) => {
      this.location = location;
      this.searchValue = location.city;
    });
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
        this._search.setLocation(location);
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
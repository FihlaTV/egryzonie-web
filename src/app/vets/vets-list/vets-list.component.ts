import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Http } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { UserService, GeolocationService } from '@services/index';
import { User } from '@interfaces/user';
import { Location } from '@interfaces/location';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';

import { VetsService } from '../vets.service';

import { Vet } from '@interfaces/vet';

@Component({
  selector: 'eg-vets-list',
  templateUrl: './vets-list.component.html',
  styleUrls: ['./vets-list.component.scss', './animations.scss']
})
export class VetsListComponent implements OnInit {
  
  public searchCitySubject = new Subject<any>();
  public searchAwait: boolean = true;

  public location: Location;

  public currentUser$: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  public vetsList: Vet[] = [];
  public othersList: any[] = [];
  public nearbyCities: Location[];

  public errorMessage: string;
  
  private _searchCity$: Subscription;

  constructor(
    private _user: UserService,
    private _geo: GeolocationService,
    private _vets: VetsService
  ) { }

  async ngOnInit() {
    this.currentUser$ = this._user.currentUser$;
    this._searchBox();

    if (sessionStorage['vetCitySearch']) {
      const city = sessionStorage['vetCitySearch'];
      this.location = await this._geo.getCityLocation(sessionStorage['vetCitySearch']);
    } else {
      this.location = await this._geo.getUserLocation();
    }
    await this._newLocation();
  }

  ngOnDestroy() {
    if (this._searchCity$) {
      this._searchCity$.unsubscribe();
    }
  }

  async searchLocation(location: Location) {
    this.searchAwait = true;
    this.location = location;
    await this._newLocation();
  }

  private _searchBox() {
    this._searchCity$ = this.searchCitySubject
      .map((event) => event.target.value)
      .debounceTime(500)
      .distinctUntilChanged()
      .flatMap((search) => {
        this.searchAwait = true;
        return Observable.of(search).delay(500);
      })
      .subscribe((search) => {
        this._handleSearch(search);
      });
  }

  private async _handleSearch(search) {
    try {
      const location = await this._geo.getCityLocation(search);
      if (!location) {
        this._error('Nie ma takiego miasta.');
        return;
      }
      this._error(null);
      this.location = location;
      await this._newLocation();
    } catch(error) {
      console.error('Nie znaleziono takiego miasta.');
    }
  }

  private async _newLocation(): Promise<void> {
    try {
      this.vetsList = await this._vets.recommendedInLocation(this.location);
      this.othersList = await this._vets.othersInLocation(this.location);
      this.nearbyCities = await this._geo.getNearbyCities(this.location);
      this.searchAwait = false;
    } catch (error) {
      this._error('Nie można zmienić miejscowości.');
      console.error('Nie można zmienić miejscowości.', error);
    }
  }

  private _error(message: string) {
    this.errorMessage = message;
    this.searchAwait = false;
  }
}
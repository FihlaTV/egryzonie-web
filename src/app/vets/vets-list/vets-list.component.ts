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

@Component({
  selector: 'eg-vets-list',
  templateUrl: './vets-list.component.html',
  styleUrls: ['./vets-list.component.scss', './animations.scss']
})
export class VetsListComponent implements OnInit {
  
  public searchCity: string;
  public searchPosition: object;
  public searchCitySubject = new Subject<any>();
  public searchAwait: boolean = true;

  public location: Location;
  public nearbyCities: Location[];

  public userPosition: object;
  public currentUser$: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  public vetsList: any[] = [];
  public othersList: any[] = [];
  
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

    this.nearbyCities = await this._geo.getNearbyCities(this.location);
    console.log(this.nearbyCities);

    this.searchAwait = false;

    // // Sprawdź, czy użytkownik ma miasto w sessionStorage
    // this.searchCity = sessionStorage['vetCitySearch'];

    // // Jeśli nie ma, sprawdź miasto użytkownika
    // if (!this.searchCity) {
    //   try {
    //     this.userPosition = await this._geo.getUserLocation();
    //     this.searchCity = this.userPosition['city'];
    //   } catch (locationError) {
    //     console.error('Couldn\'t retrieve User Position.');
    //   }
    // }

    // this._findVets();
  }
  
  // openMap(id: string) {
  //   const mapsUrl = `https://www.google.com/maps/place/?q=place_id:${id}`;
  //   window.open(mapsUrl);
  // }

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
    this.location = await this._geo.getCityLocation(search);
    this.searchAwait = false;
    sessionStorage['vetCitySearch'] = search;
    // this.searchPosition = await this._geo.getCityLocation(search);
    // this._findVets();
  }

  private async _findVets(city) {
    this.searchAwait = false;
  //   const position = this._getPosition();
  //   this.vetsList = await this._vets.recommendedInCity(this.searchCity);
  //   if (position['lat'] && position['lng']) {
  //     try {
  //       this.othersList = await this._vets.othersAround(position['lat'], position['lng'], this.vetsList);
  //     } catch (error) {
  //       console.error('Others list: ', error);
  //     }
  //   }
  }

  // private _getPosition() {
  //   console.log('User position', this.userPosition);
  //   const position = (this.searchPosition)
  //     ? { lat: this.searchPosition['lat'], lng: this.searchAwait['lng'] }
  //     : { lat: this.userPosition['latitude'], lng: this.userPosition['longitude'] };
  //   return position;
  // }
}
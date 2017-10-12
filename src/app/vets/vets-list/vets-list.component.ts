import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Http } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { UserService, GeolocationService } from '@services/index';
import { User } from '@interfaces/user';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';

import { VetsService } from '../vets.service';

@Component({
  selector: 'eg-vets-list',
  templateUrl: './vets-list.component.html',
  styleUrls: ['./vets-list.component.scss']
})
export class VetsListComponent implements OnInit {
  
  public searchCity: string;
  public searchCitySubject = new Subject<any>();
  public searchAwait: boolean = false;

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

    try {
      this._searchCity$ = this.searchCitySubject
        .map(event => {
          return event.target.value;
        })
        .debounceTime(500)
        .distinctUntilChanged()
        .flatMap(search => {
          this.searchAwait = true;
          return Observable.of(search).delay(500)
        })
        .subscribe(async (search) => {
          sessionStorage['vetCitySearch'] = search;
          this.searchAwait = false;
          this.searchCity = search;
          this._findVets();
        });

      this.userPosition = await this._geo.getUserLocation();
      this.searchCity = sessionStorage['vetCitySearch'] || this.userPosition['city'];
      this._findVets();
    } catch (error) {
      console.error(error);
    }
  }
  
  openMap(id: string) {
    window.location.href = `https://www.google.com/maps/place/?q=place_id:${id}`
  }

  view(id: string) {
    console.log('View vet ID: ', id);
  }


  private async _findVets() {
    this.vetsList = await this._vets.recommendedInCity(this.searchCity);

    if (this.userPosition['latitude'] && this.userPosition['longitude']) {
      this.othersList = await this._vets.othersAround(this.userPosition['latitude'], this.userPosition['longitude']);
    }
  }
}
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Http } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { UserService, GoogleMapsService } from '@services/index';
import { User, Location, Vet, VetsList } from '@interfaces/index';
import { VetsDataService } from './vets-data.service';
import { Coordinates } from '@interfaces/coordinates';

import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'eg-vets',
  templateUrl: './vets.component.html',
  styleUrls: ['./vets.component.scss']
})
export class VetsComponent implements OnInit, OnDestroy {

  public currentUser$;
  public currentLocation: Location;

  private location$: Subscription;
  private vets$: Subscription;

  public coordinates: Coordinates;
  public vets: VetsList;

  public recommendedVets: Vet[];
  public otherVets: Vet[];

  constructor(
    private _user: UserService,
    private _http: Http,
    private _vets: VetsDataService,
    private _gmaps: GoogleMapsService
  ) { }

  ngOnInit() {
    this.currentUser$ = this._user.currentUser$;
    this.location$ = this._gmaps.location().subscribe((location) => this._vets.vetsInRange(location));
    this.vets$ = this._vets.vetsList().subscribe((vets) => {
      if (vets) {
        this.vets = vets;
        this._vets.setLoading(false);
      }
    });
  }

  ngOnDestroy() {
    if (this.location$) {
      this.location$.unsubscribe();
    }
    if (this.vets$) {
      this.vets$.unsubscribe();
    }
  }
}

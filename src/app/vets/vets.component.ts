import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { UserService, GeolocationService } from '@services/index';
import { User, Location, Vet, VetsList } from '@interfaces/index';
import { VetSearchService } from './vet-search.service';

import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'eg-vets',
  templateUrl: './vets.component.html',
  styleUrls: ['./vets.component.scss']
})
export class VetsComponent implements OnInit {

  public currentUser$;
  public location: Location;

  private location$: Subscription;
  private vets$: Subscription;

  public vets: VetsList;

  public recommendedVets: Vet[];
  public otherVets: Vet[];

  constructor(
    private _user: UserService,
    private _geo: GeolocationService,
    private _http: Http,
    private _search: VetSearchService
  ) { }

  ngOnInit() {
    this.currentUser$ = this._user.currentUser$;
    this.location$ = this._search.getLocation().subscribe((location) => {
      this.location = location;
    });
    this.vets$ = this._search.vetsData().subscribe((vets) => {
      if (vets) {
        this.vets = vets;
      }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { VetsService } from '../vets.service';
import { GeolocationService, GoogleMapsService } from '@services/index';

import { Vet, Location } from '@interfaces/index';

declare const google;

@Component({
  selector: 'eg-vet-view',
  templateUrl: './vet-view.component.html',
  styleUrls: ['./vet-view.component.scss']
})
export class VetViewComponent implements OnInit {

  public vetData: Vet;
  public location: Location;

  private _vetId: string;
  private _paramsSub: Subscription;
  private _vetSub: Subscription;

  constructor (
    private _route: ActivatedRoute,
    private _vet: VetsService,
    private _geo: GeolocationService,
    private _maps: GoogleMapsService
  ) {
  }

  ngOnInit() {
    this._paramsSub = this._route.params.subscribe(async (params) => {
      try {
        this.vetData = await this._vet.getVetDetails(params['vetId']);
        const location = await this._geo.locationByPlaceID(this.vetData.googleMapsID);
      } catch (error) {
        console.error('ERRROR', error);
      }
    });
  }

  ngOnDestroy() {
    if (this._paramsSub) {
      this._paramsSub.unsubscribe();
    }
  }

}
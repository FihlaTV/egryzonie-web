import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { VetsService } from '../vets.service';
import { GeolocationService } from '@services/geolocation.service';

declare const google: any;

@Component({
  selector: 'eg-vet-view',
  templateUrl: './vet-view.component.html',
  styles: []
})
export class VetViewComponent implements OnInit {

  public vetData: any;
  public map: any;

  private _vetId: string;
  private _paramsSub: Subscription;
  private _vetSub: Subscription;

  constructor (
    private _route: ActivatedRoute,
    private _vet: VetsService,
    private _geo: GeolocationService
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
      // const map = new 
    });
  }

  ngOnDestroy() {
    if (this._paramsSub) {
      this._paramsSub.unsubscribe();
    }
  }

}
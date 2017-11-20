import { Component, OnInit, OnDestroy, Input, NgZone } from '@angular/core';
import { Vet } from '@interfaces/vet';
import { VetsDataService } from '../vets-data.service';
import { Subscription } from 'rxjs/Subscription';
import { environment } from 'environments/environment';

@Component({
  selector: 'eg-vet-details',
  templateUrl: './vet-details.component.html',
  styleUrls: ['./vet-details.component.scss']
})
export class VetDetailsComponent implements OnInit, OnDestroy {
  private _vet$: Subscription;
  public vet: Vet;
  public directionsUrl: string;

  constructor( private _vets: VetsDataService, private _zone: NgZone ) {}

  ngOnInit() {
    this._vet$ = this._vets.observeCurrentVetData().subscribe((vet) => {
      if (!vet) return;
      this._zone.run(() => {
        this.vet = vet;
        this.directionsUrl = `https://www.google.com/maps/dir/?api=1&key=${environment.googleKey}&destination=${encodeURIComponent(vet.title)}&destination_place_id=${vet.googleMapsID}&dir_action=navigate`;
      });
    });
  }

  ngOnDestroy() {
    if (this._vet$) {
      this._vet$.unsubscribe();
    }
  }

  proposeAsRecommended(vet: Vet) {
    this._vets.recommend(vet);
  }
}
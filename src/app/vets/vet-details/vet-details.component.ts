import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Vet } from '@interfaces/vet';
import { VetsDataService } from '../vets-data.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'eg-vet-details',
  templateUrl: './vet-details.component.html',
  styleUrls: ['./vet-details.component.scss']
})
export class VetDetailsComponent implements OnInit, OnDestroy {
  private _vet$: Subscription;
  public vet: Vet;

  constructor( private _vets: VetsDataService ) {}

  ngOnInit() {
    // this._vetSub = this._vets.watchCurrentVet().subscribe((vet) => {
    //   if (vet) {
    //     this.vet = vet;
    //   }
    // });
  }

  ngOnDestroy() {
    if (this._vet$) {
      this._vet$.unsubscribe();
    }
  }
}
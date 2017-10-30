import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Vet } from '@interfaces/vet';
import { VetSearchService } from '../vet-search.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'eg-vet-details',
  templateUrl: './vet-details.component.html',
  styles: []
})
export class VetDetailsComponent implements OnInit, OnDestroy {
  private _vetSub: Subscription;
  public vet: Vet;

  constructor( private _search: VetSearchService ) {}

  ngOnInit() {
    this._vetSub = this._search.watchCurrentVet().subscribe((vet) => {
      if (vet) {
        this.vet = vet;
      }
    });
  }

  ngOnDestroy() {
    this._vetSub.unsubscribe();
  }
}
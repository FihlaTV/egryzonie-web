import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { VetSearchService } from '../../vet-search.service';
import { Vet, Location, VetsList } from '@interfaces/index';

import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'eg-vets-search-results',
  templateUrl: './vets-search-results.component.html',
  styleUrls: ['./vets-search-results.component.scss']
})
export class VetsSearchResultsComponent implements OnInit, OnDestroy {
  @Input() public results: Vet[] = [];
  @Input() public title: string = 'Weterynarze';
  @Input() public featured: boolean = false;
  @Input() public show: boolean = true;
  @Input() public noResultsText = 'Nic nie znaleziono.';
  public location: Location;
  public vets: VetsList;

  public vets$: Subscription;

  @Output() public onVetSelect: EventEmitter<Vet> = new EventEmitter<Vet>();

  private _location$: Subscription;

  constructor( private _search: VetSearchService ) {}

  ngOnInit() {
    this._location$ = this._search.getLocation().subscribe((location) => {
      this.location = location;
    });
  }

  ngOnDestroy() {
    this._location$.unsubscribe();
  }

  selectVet(vet: Vet) {
    if (vet['location']) {
      this._search.zoomAt(vet['location'], 18);
      this._search.currentVet = vet;
    }
  }
}

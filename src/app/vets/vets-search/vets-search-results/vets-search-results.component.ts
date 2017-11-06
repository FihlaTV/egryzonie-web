import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { GoogleMapsService } from '@services/google-maps.service';
import { VetsDataService } from '../../vets-data.service';
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

  constructor(
    private _vets: VetsDataService,
    private _gmaps: GoogleMapsService
  ) {}

  ngOnInit() {
  }

  ngOnDestroy() {
    this._location$.unsubscribe();
  }

  selectVet(vet: Vet) {
  }
}

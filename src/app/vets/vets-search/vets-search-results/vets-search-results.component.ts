import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, NgZone } from '@angular/core';
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
  @Input() public title: string = 'Weterynarze';
  @Input() public featured: boolean = false;
  @Input() public noResultsText = 'Nic nie znaleziono.';
  public location: Location;
  public results: Vet[];
  public show: boolean = true;

  @Output() public onVetSelect: EventEmitter<Vet> = new EventEmitter<Vet>();

  private _vets$: Subscription;

  constructor(
    private _vets: VetsDataService,
    private _gmaps: GoogleMapsService,
    private _zone: NgZone
  ) {}

  ngOnInit() {
    this._initVetsSub();
    this.show = this.featured;
  }

  ngOnDestroy() {
    if (this._vets$) {
      this._vets$.unsubscribe();
    }
  }

  selectVet(id: any, recommended: boolean) {
    this._vets.fetchVetDetails({ id, recommended });
  }

  private _initVetsSub() {
    this._vets$ = this._vets.observeVetsList()
      .distinctUntilChanged()
      .debounceTime(500)
      .subscribe((vets) => {
        if (!vets) return;
        this._zone.run(() => {
          this.results = this.featured ? vets.recommended : vets.others
        });
      });
  }
}

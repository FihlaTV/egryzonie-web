import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { VetsService } from '../vets.service';

@Component({
  selector: 'eg-vet-view',
  template: `Vet View works!`,
  styles: []
})
export class VetViewComponent implements OnInit {
  
  public vetData: any;
  private _vetId: string;
  
  private _paramsSub: Subscription;
  private _vetSub: Subscription;

  constructor (
    private _route: ActivatedRoute,
    private _vet: VetsService
  ) { }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

}
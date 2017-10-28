import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Vet } from '@interfaces/vet';

@Component({
  selector: 'eg-vet-details',
  template: 'Vet details works!',
  styles: []
})
export class VetDetailsComponent implements OnInit, OnDestroy {
  @Input() public vet: Vet;
  
  constructor() {}

  ngOnInit() {}

  ngOnDestroy() {}
}
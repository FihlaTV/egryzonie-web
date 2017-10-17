import { Component, Input } from '@angular/core';
import { Vet } from '@interfaces/vet';

@Component({
  selector: 'eg-list-display',
  templateUrl: './list-display.component.html',
  styleUrls: ['./list-display.component.scss']
})
export class ListDisplayComponent {
  public defaultClass = 'item-list';

  @Input() list: Vet[] = [];
  @Input() classes: string[] = [];
  @Input() emptyListMessage: string = '';

  constructor() { }

  ngOnInit() {
    this.classes = [...[this.defaultClass], ...this.classes.map((item) => {
      return `${this.defaultClass}--${item}`;
    })];
  }
  
  openMap(id: string) {
    const mapsUrl = `https://www.google.com/maps/place/?q=place_id:${id}`;
    window.open(mapsUrl);
  }
}
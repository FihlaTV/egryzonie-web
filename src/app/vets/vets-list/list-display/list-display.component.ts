import { Component, Input } from '@angular/core';
import { Vet, User } from '@interfaces/index';

@Component({
  selector: 'eg-list-display',
  templateUrl: './list-display.component.html',
  styleUrls: ['./list-display.component.scss']
})
export class ListDisplayComponent {
  public defaultClass = 'item-list';

  @Input() public list: Vet[] = [];
  @Input() public classes: string[] = [];
  @Input() public emptyListMessage: string = '';
  @Input() public currentUser: User = null;
  @Input() public options: object = {};

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

  recommend(vet: Vet) {
    console.log('Recommend: ', vet.title);
  }
}
import { Component, Input } from '@angular/core';

@Component({
  selector: 'eg-star-rating',
  template: `
    <ul class="starRating">
      <li class="starRating__item" *ngFor="let i of [0,1,2,3,4]">
        <span [ngClass]="{ 'fa': true, 'fa-star': i < rating, 'fa-star-o': i >= rating }"></span>
      </li>
    </ul>`,
  styleUrls: ['./star-rating.component.scss']
})
export class StarRatingComponent {
  @Input() rating: number = 0;
}
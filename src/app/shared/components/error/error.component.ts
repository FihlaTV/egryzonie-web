import { Component, Input } from '@angular/core';

@Component({
  selector: 'eg-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent {
  @Input() message: string = '';
}
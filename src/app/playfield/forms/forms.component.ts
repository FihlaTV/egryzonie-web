import { Component } from '@angular/core';

@Component({
  templateUrl: './forms.component.html',
  styles: [
    `
      .forms { max-width: 960px; margin: 0 auto; }
    `
  ]
})
export class FormsComponent {
  public options: any = [
    [1, 'Option One'],
    [2, 'Option Two'],
    [3, 'Option Three'],
    [4, 'Option Four'],
    [5, 'Option Five'],
    [6, 'Option Six']
  ];
}
import { Component } from '@angular/core';
import { environment } from 'environments/environment';

@Component({
  selector: 'eg-version',
  template: `<div class="version">Current app version: ${environment.appVersion}</div>`,
  styles: [`
    .version {
      border: 1px solid #656565;
      background: #ffffff;
      color: #212121;
      font-size: .85rem;
      position: fixed;
      bottom: 10px;
      right: 10px;
      padding: 1.2em;
      box-sizing: border-box;
      opacity: .3;
      transition: opacity .1s ease-in-out;
      z-index: 9999999;
    }
    .version:hover {
      opacity: 1;
    }
  `]
})
export class VersionComponent {}
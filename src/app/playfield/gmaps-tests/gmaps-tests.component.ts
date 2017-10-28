import { Component, OnInit, OnDestroy } from '@angular/core';
import { environment } from 'environments/environment';

declare const google: any;

@Component({
  template: '<div id="map"></div>',
  styles: [`
    #map {
      width: 100%;
      min-height: 400px;
    }
  `]
})
export class GmapsTestsComponent implements OnInit, OnDestroy {
  constructor() {

  }

  ngOnInit() {
    const mapProp = {
      center: new google.maps.LatLng(51.508742, -0.120850),
      zoom: 5,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    const map = new google.maps.Map(document.getElementById('map'), mapProp);
  }

  ngOnDestroy() {

  }
}

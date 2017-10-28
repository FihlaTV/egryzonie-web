import { Injectable } from '@angular/core';

import { Location } from '@interfaces/location';

declare const google: any;

@Injectable()
export class GoogleMapsService {

  public mapStyles: any[] = [
    {
      "featureType": "administrative",
      "elementType": "labels.text.fill",
      "stylers": [
      {
        "color": "#444444"
      }]
    },
    {
      "featureType": "landscape",
      "elementType": "all",
      "stylers": [
      {
        "visibility": "simplified"
      },
      {
        "hue": "#ffb200"
      }]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#f4f3f2"
            },
            {
                "lightness": 20
            }
        ]
    },
    {
        "featureType": "landscape.natural",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#f4f3f2"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#cbdfa8"
            }
        ]
    },
    {
      "featureType": "poi.business",
      "elementType": "all",
      "stylers": [
      {
        "visibility": "on"
      }]
    },
    {
      "featureType": "poi.business",
      "elementType": "geometry.fill",
      "stylers": [
      {
        "visibility": "on"
      }]
    },
    {
      "featureType": "poi.business",
      "elementType": "geometry.stroke",
      "stylers": [
      {
        "visibility": "off"
      }]
    },
    {
      "featureType": "poi.business",
      "elementType": "labels",
      "stylers": [
      {
        "visibility": "on"
      }]
    },
    {
      "featureType": "poi.business",
      "elementType": "labels.text.fill",
      "stylers": [
      {
        "visibility": "on"
      }]
    },
    {
      "featureType": "poi.business",
      "elementType": "labels.text.stroke",
      "stylers": [
      {
        "visibility": "off"
      }]
    },
    {
      "featureType": "poi.business",
      "elementType": "labels.icon",
      "stylers": [
      {
        "visibility": "on"
      },
      {
        "saturation": "0"
      },
      {
        "lightness": "0"
      },
      {
        "gamma": "1.00"
      },
      {
        "weight": "1.00"
      },
      {
        "hue": "#00baff"
      }]
    },
    {
      "featureType": "road",
      "elementType": "all",
      "stylers": [
      {
        "lightness": "0"
      },
      {
        "visibility": "on"
      }]
    },
    {
      "featureType": "road",
      "elementType": "geometry.fill",
      "stylers": [
      {
        "visibility": "on"
      },
      {
        "color": "#ffffff"
      }]
    },
    {
      "featureType": "road.highway",
      "elementType": "all",
      "stylers": [
      {
        "visibility": "simplified"
      }]
    },
    {
      "featureType": "transit",
      "elementType": "labels.icon",
      "stylers": [
      {
        "visibility": "on"
      }]
    },
    {
      "featureType": "water",
      "elementType": "all",
      "stylers": [
      {
        "color": "#c6dae3"
      },
      {
        "visibility": "on"
      }]
    }
  ];

  public mapProps: any;
  public map: any;
  public markers: any[] = [];

  initMap(element: any, location: Location): Promise<null> {
    return new Promise((resolve, reject) => {
      const waitForGoogle = setInterval(() => {
        if (typeof google !== 'undefined') {
          clearInterval(waitForGoogle);
          this._createMap(element, location);
          resolve();
        }
      }, 150);
      // Wait 5 seconds for Google, then reject
      setTimeout(() => {
        clearInterval(waitForGoogle);
        reject();
      }, 5000);
    })
  }

  placeMarkers(markers, asset = 'map-marker-black.svg') {
    markers.forEach((item) => {
      this.markers.push(
        new google.maps.Marker({
          position: item.position,
          map: this.map,
          icon: `/assets/${asset}`
        })
      );
    })
  }

  private _createMap(element, location) {
    this.mapProps = {
      center: new google.maps.LatLng(location.coords.lat, location.coords.lng),
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: this.mapStyles
    };
    this.map = new google.maps.Map(element, this.mapProps);
  }
}

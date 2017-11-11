import { Injectable } from '@angular/core';
import { Coordinates } from '@interfaces/coordinates';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable'

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

  private _coordinates: Coordinates;

  public mapProps: any;
  public map: any;
  public markers: any[] = [];
  
  private _markerClickSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private _centerSubject: BehaviorSubject<Coordinates> = new BehaviorSubject<Coordinates>(null);

  initMap(element: any, coordinates: Coordinates): Promise<{}|null> {
    this._centerSubject = new BehaviorSubject(coordinates);
    this._coordinates = coordinates;
    return new Promise(async (resolve, reject) => {
      const waitForGoogle = setInterval(() => {
        if (typeof google !== 'undefined') {
          clearInterval(waitForGoogle);
          this._createMap(element, coordinates);
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

  placeMarkers(markerGroups) {
    let group, item;
    for (let i = 0, n1 = markerGroups.length; i < n1; i++) {
      group = markerGroups[i];
      for (let j = 0, n2 = group.items.length; j < n2; j++) {
        item = group.items[j];
        this._createMarker(item.subject, item.position, group.icon);
      }
    }
  }

  clearMarkers() {
    for (let i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(null);
    }
    this.markers = [];
  }

  markerClicks(): Observable<any> {
    return this._markerClickSubject.asObservable();
  }

  location(): Observable<Coordinates> {
    return this._centerSubject.asObservable();
  }

  resize() {
    if (this.map.checkResize) {
      this.map.checkResize();
    }
  }

  go(coordinates: Coordinates, zoom: number) {
    this.map.setCenter(new google.maps.LatLng({ lat: coordinates.lat, lng: coordinates.lng }));
    this.map.setZoom(zoom);
    this._centerSubject.next(coordinates);
  }

  private _createMarker(subject: any, position: any, icon: string = 'map-marker-black.svg'): void {
    if (!this.markers.find(m => m.position.lat() === position.lat())) {
      const marker = new google.maps.Marker({
        position: position,
        map: this.map,
        icon: `/assets/${icon}`,
      });
      google.maps.event.addListener(marker, 'click', () => {
        this._markerClickSubject.next(subject);
      });
      this.markers.push(marker);
    }
  }

  private _createMap(element: any, coordinates: Coordinates) {
    this.mapProps = {
      center: new google.maps.LatLng(coordinates.lat, coordinates.lng),
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: this.mapStyles
    };
    this.map = new google.maps.Map(element, this.mapProps);
    
    google.maps.event.addListener(this.map, 'dragend', (event) => {
      const location = this.map.getCenter();
      this._centerSubject.next(<Coordinates>{ lat: location.lat(), lng: location.lng() });
    })

  }
}

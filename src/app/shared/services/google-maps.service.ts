import { Injectable } from '@angular/core';

declare const google;

@Injectable()
export class GoogleMapsService {

  mapStyles: object[] = [
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

  initMap(element, location, placeMarker = true) {
    const map = new google.maps.Map(document.getElementById('map'), {
      center: {
        lat: location.coords.lat,
        lng: location.coords.lng
      },
      zoom: 17,
      disableDefaultUI: true,
      styles: this.mapStyles
    });
    if (placeMarker) {
      const marker = new google.maps.Marker({
        position: {
          lat: location.coords.lat,
          lng: location.coords.lng
        },
        map: map,
        visibility: true
      });
    }
  }
}

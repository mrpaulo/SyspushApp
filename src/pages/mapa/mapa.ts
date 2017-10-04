import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, ViewController, Platform } from 'ionic-angular';
import { FotoDoAlertaPage } from '../foto-do-alerta/foto-do-alerta';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions  
 } from '@ionic-native/google-maps';

//AIzaSyB6wgJQs448gRBN0XDo03WuEULy7Dl_TKI

@Component({
  selector: 'page-mapa',
  templateUrl: 'mapa.html'
})
export class MapaPage {
  @ViewChild('myMap') mapElement: ElementRef;//ElementRef
  map: GoogleMap;
  //mapElement: HTMLElement;

  constructor(public navCtrl: NavController, private googleMaps: GoogleMaps, public viewCtrl: ViewController, public elRef: ElementRef, public platform: Platform) {
   // constructor(public navCtrl: NavController, public platform: Platform) {
  platform.ready().then(() => {
    console.log("PLATFORM READY!");
    this.initMap();
  });    
  }
  
  initMap(){
    let element = this.mapElement.nativeElement;//document.getElementById('myMap');
    console.log('mapElement: '+ element);

    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: 43.0741904,
          lng: -89.3809802
        },
        zoom: 18,
        tilt: 30
      }
    };

    this.map = this.googleMaps.create(element, mapOptions);
    console.log('map: '+ this.map);

    // Wait the MAP_READY before using any methods.
    this.map.one(GoogleMapsEvent.MAP_READY)
    .then(() => {
      console.log('Map is ready!');

      // Now you can use all methods safely.
      this.map.addMarker({
          title: 'Ionic',
          icon: 'blue',
          animation: 'DROP',
          position: {
            lat: 43.0741904,
            lng: -89.3809802
          }
        })
        .then(marker => {
          marker.on(GoogleMapsEvent.MARKER_CLICK)
            .subscribe(() => {
              alert('clicked');
            });
        });

    });

  }//final mapa

  // loadMap(){
    
    
  //      //let latLng = new google.maps.LatLng(-29.639410, -50.787776);
    
  //      let mapOptions: GoogleMapOptions = {
  //       camera: {
  //         target: {
  //           lat: 43.0741904,
  //           lng: -89.3809802
  //         },
  //         zoom: 18,
  //         tilt: 30
  //       }
  //     };
  //     console.log('mapOptions: '+ mapOptions);
  //     this.map = this.googleMaps.create(this.mapElement, mapOptions);
  //     console.log('map: '+ this.map);
  //      // Wait the MAP_READY before using any methods.
  //   this.map.one(GoogleMapsEvent.MAP_READY)
  //   .then(() => {
  //     console.log('Map is ready!');
  //     // Now you can use all methods safely.
  //     this.map.addMarker({
  //         title: 'Ionic',
  //         icon: 'blue',
  //         animation: 'DROP',
  //         position: {
  //           lat: 43.0741904,
  //           lng: -89.3809802
  //         }
  //       })
  //       .then(marker => {
  //         marker.on(GoogleMapsEvent.MARKER_CLICK)
  //           .subscribe(() => {
  //             alert('clicked');
  //           });
  //       });

  //   });
  //    }

  goToFotoDoAlerta(params){
    if (!params) params = {};
    this.navCtrl.push(FotoDoAlertaPage, {
      key: params      
    });
  }
}

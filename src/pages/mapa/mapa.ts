import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, ViewController, Platform, NavParams } from 'ionic-angular';
import { FotoDoAlertaPage } from '../foto-do-alerta/foto-do-alerta';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions
} from '@ionic-native/google-maps';
import { AcessarProvider } from '../../providers/acessar/acessar';
//AIzaSyB6wgJQs448gRBN0XDo03WuEULy7Dl_TKI

@Component({
  selector: 'page-mapa',
  templateUrl: 'mapa.html'
})
export class MapaPage {
  longitude: number;
  latitude: number;
  titulo: any;
  @ViewChild('myMap') mapElement: ElementRef;
  map: GoogleMap;
  coordenadas: any;

  constructor(public navCtrl: NavController, private googleMaps: GoogleMaps, public viewCtrl: ViewController, public elRef: ElementRef, public platform: Platform, public ap: AcessarProvider, public navParams: NavParams) {
    platform.ready().then(() => {
      let idAlert = this.navParams.get("key");
      console.log("Keyy: "+ idAlert);
      let oneAlert = ap.especificoAlerta(idAlert);
      oneAlert.subscribe(snapshot => {
        this.coordenadas = snapshot.val().local_alert;
        this.titulo = snapshot.val().title_alert;        
      });
      this.initMap();
    });
  }

  initMap() {

    const [first, second] = this.coordenadas.split(', ');    
    this.latitude = +first;// o + transforma para numero
    this.longitude = +second;    

    let element = this.mapElement.nativeElement;
    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: this.latitude,
          lng: this.longitude
        },
        zoom: 15,//18
        tilt: 30
      }
    };

    this.map = this.googleMaps.create(element, mapOptions);
    console.log('map: ' + this.map);

    // Wait the MAP_READY before using any methods.
    this.map.on(GoogleMapsEvent.MAP_READY)
      .subscribe(() => {
        // Now you can use all methods safely.
        this.map.addMarker({
          title: this.titulo,
          icon: 'blue',
          animation: 'DROP',
          position: {
            lat: this.latitude,
            lng: this.longitude
          }
        })
          .then(marker => {
            marker.on(GoogleMapsEvent.MARKER_CLICK)
              .subscribe(() => {
                //alert('clicked');
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

  goToFotoDoAlerta(params) {
    if (!params) params = {};
    this.navCtrl.push(FotoDoAlertaPage, {
      key: params
    });
  }
}

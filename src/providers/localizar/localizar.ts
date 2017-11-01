import { Injectable } from '@angular/core';
//import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { NavController } from "ionic-angular";
import { Geolocation } from '@ionic-native/geolocation';

@Injectable()
export class LocalizarProvider {  
  lng: number;
  lat: number;
  latLng: any;

  constructor(public navCtrl: NavController, 
              public geolocation: Geolocation
  ){    
  }

  obterLocal(){
    this.geolocation.getCurrentPosition().then((position) => {     
     this.lat = position.coords.latitude;
     this.lng = position.coords.longitude;
     this.latLng = position.coords;     
    }, 
      (err) => {
           console.log(err);
      }
    );
    console.log('lat: ' + this.lat); 
    console.log('lng: ' + this.lng);       
    console.log('Coordenadas: ' + this.latLng);
    let coordenadas: any = {};
    coordenadas.latitude = this.lat;
    coordenadas.longitude = this.lng;
    console.log('Coordenadas: ' + coordenadas);
    // this.latLng.toString(); JSON.stringify(this.latLng); JSON.parse(this.latLng);
    return this.lat//"-29.639410, -50.787776";
  } //cordova plugin add phonegap-plugin-push --variable SENDER_ID=105371248958 --save

}

import { Injectable } from '@angular/core';
//import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { NavController } from "ionic-angular";
import { Geolocation } from '@ionic-native/geolocation';

@Injectable()
export class LocalizarProvider {  
  latLng: any;

  constructor(public navCtrl: NavController, 
              public geolocation: Geolocation
  ) {    
  }
  obterLocal(){
    this.geolocation.getCurrentPosition().then((position) => {
      //this.latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      //this.lat = position.coords.latitude;
      //this.lng = position.coords.longitude;
     this.latLng = position.coords; //this.lat +","+ this.lng;
      console.log('latLng: ' + this.latLng);
    }, 
      (err) => {
           console.log(err);
      }
      );

    //let coordenadas = this.latLng.toString();//"-29.639410, -50.787776";
    //console.log('Coordenadas: ' + coordenadas);
    return "-29.639410, -50.787776";
  } //cordova plugin add phonegap-plugin-push --variable SENDER_ID=105371248958 --save
}

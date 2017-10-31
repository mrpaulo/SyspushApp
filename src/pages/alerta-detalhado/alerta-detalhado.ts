import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MapaPage } from '../mapa/mapa';
//import { FirebaseListObservable, FirebaseObjectObservable } from "angularfire2/database";
import { AcessarProvider } from "../../providers/acessar/acessar";

@Component({
  selector: 'page-alerta-detalhado',
  templateUrl: 'alerta-detalhado.html',
  providers: [
    AcessarProvider
  ]
})
export class AlertaDetalhadoPage {
  public alerts: any;
  public idAlert: any;
  oneAlert: any;
  title_alerts: any;

    constructor(
      public navCtrl: NavController, 
      public ap: AcessarProvider,
      public navParams: NavParams    
    ) {
      this.idAlert = this.navParams.get("key"); 
      this.oneAlert = ap.especificoAlerta(this.idAlert);
      console.log("idAlert2: "+ this.idAlert);
      //this.oneAlert.snapshotChanges().map(alert => this.oneAlert = alert.val());
      // this.oneAlert.subscribe(snapshot => {
      //   this.oneAlert = snapshot.val();        
      // });                
    }  
  goToMapa() {    
    this.navCtrl.push(MapaPage, {
      key: this.idAlert
    });
  }
}

import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
//import { FirebaseListObservable, FirebaseObjectObservable } from "angularfire2/database";
import { AcessarProvider } from "../../providers/acessar/acessar";

@Component({
  selector: 'page-foto-do-alerta',
  templateUrl: 'foto-do-alerta.html',
  providers: [
    AcessarProvider
  ]
})
export class FotoDoAlertaPage {
  idAlert: any;
  oneAlert:  any = {};
  
    constructor(
      public navCtrl: NavController, 
      public ap: AcessarProvider,
      public navParams: NavParams    
    ) {
      //this.item = this.navParams.data.alerta;  
      this.idAlert = this.navParams.get("key");       
      const subscribe = ap.especificoAlerta(this.idAlert).subscribe((alerta: any) => {
        this.oneAlert = alerta.payload.val();        
        subscribe.unsubscribe();
      });     
    }  
    goBack() {
      this.navCtrl.pop();
    }
}

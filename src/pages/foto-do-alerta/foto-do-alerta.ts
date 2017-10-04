import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FirebaseListObservable, FirebaseObjectObservable } from "angularfire2/database";
import { AcessarProvider } from "../../providers/acessar/acessar";

@Component({
  selector: 'page-foto-do-alerta',
  templateUrl: 'foto-do-alerta.html',
  providers: [
    AcessarProvider
  ]
})
export class FotoDoAlertaPage {
  public alerts: FirebaseListObservable<any>;
  public idAlert: any;
  oneAlert: FirebaseObjectObservable<any>;
  
    constructor(
      public navCtrl: NavController, 
      public ap: AcessarProvider,
      public navParams: NavParams    
    ) {
      this.idAlert = this.navParams.get("key");
      this.oneAlert = ap.especificoAlerta(this.idAlert);
      this.oneAlert.subscribe(snapshot => {
        this.oneAlert = snapshot.val();
      });       
    }
  
    goBack() {
      this.navCtrl.pop();
    }
}

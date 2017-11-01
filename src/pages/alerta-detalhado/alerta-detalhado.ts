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
  // o objeto estava nulo com isso não conseguia acessar as propriedades até serem recuperadas do firebase
  // coloquei o "{}" para iniciar o objeto
  oneAlert: any = {};
  title_alerts: any;

    constructor(
      public navCtrl: NavController,
      public ap: AcessarProvider,
      public navParams: NavParams
    ) {
      this.idAlert = this.navParams.get("key"); 
      // tem que fazer o subscribe para pegar o objeto
      const subscribe = ap.especificoAlerta(this.idAlert).subscribe((alerta: any) => {
        this.oneAlert = alerta.payload.val();

        // sempre faça o unsubscribe quando não precisar ficar recebendo os dados do item quando ouver modificações
        subscribe.unsubscribe();
      });
      console.log("idAlert2: "+ this.idAlert);
      //this.oneAlert.snapshotChanges().map(alert => this.oneAlert = alert.val());
      // this.oneAlert.subscribe(snapshot => {
      //   this.oneAlert = snapshot.val();
      // });
    }
  goToMapa() {
    // Quando vc tiver o elemento passa ele em vez de passar o Id
    this.navCtrl.push(MapaPage, {
      alerta: this.oneAlert
    });
  }
}

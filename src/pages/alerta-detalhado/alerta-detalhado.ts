import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MapaPage } from '../mapa/mapa';
import { AcessarProvider } from "../../providers/acessar/acessar";

@Component({
  selector: 'page-alerta-detalhado',
  templateUrl: 'alerta-detalhado.html',
  providers: [
    AcessarProvider
  ]
})
export class AlertaDetalhadoPage {  
  public idAlert: any;  
  oneAlert: any = {};
  
    constructor(
      public navCtrl: NavController,
      public ap: AcessarProvider,
      public navParams: NavParams
    ) {
      this.idAlert = this.navParams.get("key");       
      const subscribe = ap.especificoAlerta(this.idAlert).subscribe((alerta: any) => {
        this.oneAlert = alerta.payload.val();        
        subscribe.unsubscribe();
      });     
    }
    goToMapa() {     
      this.navCtrl.push(MapaPage, {
        key: this.idAlert       
      });
    }
}

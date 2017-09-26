import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertaDetalhadoPage } from '../alerta-detalhado/alerta-detalhado';
import { FotoDoAlertaPage } from '../foto-do-alerta/foto-do-alerta';
import { MapaPage } from '../mapa/mapa';
import { FirebaseListObservable } from "angularfire2/database";
import { AcessarProvider } from "../../providers/acessar/acessar";

@Component({
  selector: 'page-in-cio',
  templateUrl: 'in-cio.html',
  providers: [
    AcessarProvider
  ]
})
export class InCioPage {
  public alerts: FirebaseListObservable<any>;
  public retorno: any;

  constructor(
    public navCtrl: NavController,
    public ap: AcessarProvider    
  ) {
    this.alerts = ap.ultimoAlerta();
    this.retorno = ap.retornaTipo();
    console.log("vindo do ap:"+ this.retorno);
    let data = new Date();
    console.log("Data:"+ data);
  }  

  goToAlertaDetalhado(params1) {
    if (!params1) params1 = {};
    this.navCtrl.push(AlertaDetalhadoPage, {
      key: params1
    });
  }
  goToFotoDoAlerta(params) {
    if (!params) params = {};
    this.navCtrl.push(FotoDoAlertaPage, {
      key: params
    });
  }
  goToMapa(params) {
    if (!params) params = {};
    this.navCtrl.push(MapaPage, {
      key: params
    });
  }
}

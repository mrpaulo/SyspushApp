import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertaDetalhadoPage } from '../alerta-detalhado/alerta-detalhado';
import { FotoDoAlertaPage } from '../foto-do-alerta/foto-do-alerta';
import { MapaPage } from '../mapa/mapa';
import { AcessarProvider } from "../../providers/acessar/acessar";
import { FirebaseListObservable } from "angularfire2/database";

@Component({
  selector: 'page-hist-rico-alerta',
  templateUrl: 'hist-rico-alerta.html',
  providers: [
    AcessarProvider
  ]
})
export class HistRicoAlertaPage {
  public alerts: FirebaseListObservable<any>;

  constructor(
    public navCtrl: NavController, 
    public ap: AcessarProvider    
  ) {
    this.alerts = ap.listarAlertas();    
  }

  goToAlertaDetalhado(params) {
    if (!params) params = {};
    this.navCtrl.push(AlertaDetalhadoPage, {
      key: params
    });
  }
  goToFotoDoAlerta(params) {
    if (!params) params = {};
    this.navCtrl.push(FotoDoAlertaPage, {
      item: params
    });
  }
  goToMapa(params) {
    if (!params) params = {};
    this.navCtrl.push(MapaPage);
  }
}

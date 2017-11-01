import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertaDetalhadoPage } from '../alerta-detalhado/alerta-detalhado';
import { FotoDoAlertaPage } from '../foto-do-alerta/foto-do-alerta';
import { MapaPage } from '../mapa/mapa';
import { AcessarProvider } from "../../providers/acessar/acessar";
import { Observable } from 'rxjs/Observable';
import { AngularFireList } from 'angularfire2/database';
//import { FirebaseListObservable } from "angularfire2/database";

@Component({
  selector: 'page-hist-rico-alerta',
  templateUrl: 'hist-rico-alerta.html',
  providers: [
    AcessarProvider
  ]
})
export class HistRicoAlertaPage {
  public alerts: AngularFireList<any>;
  itens: Observable<any[]>;


  constructor(
    public navCtrl: NavController, 
    public ap: AcessarProvider    
  ) {
    this.alerts = ap.listarAlertas();
    this.itens = this.alerts.snapshotChanges().map(changes => {
      // Você pode acessar a key direto com o m.key em vez do m.payload.key
      return changes.map(m => ({ key: m.key, alerta: m.payload.val() }));
    })     
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

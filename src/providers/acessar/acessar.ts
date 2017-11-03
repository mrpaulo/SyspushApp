import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { AlertController, ActionSheetController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
// import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class AcessarProvider {
  id: any;
  logEmail: string;
  tipo: any;
  alerts: any;
  oneAlert: any;
  users: any;
  e_mail: string;
  usuario: any;
  url_img: string;
  key: any;
  user: any = {};

  constructor(
    public alertCtrl: AlertController,
    public af: AngularFireDatabase,
    public actionSheetCtrl: ActionSheetController,
    private angularFireAuth: AngularFireAuth
  ) {

  }

  aproveAlert(alertId, title_alert, type_alert, date_alert, last_description, url_photo, local_alert) {
    this.alerts = this.af.list('/alertList');
    if (type_alert == "1") { this.url_img = "img/thumbnailVermelho.jpg"; } if (type_alert == "2") { this.url_img = "img/thumbnailAmarelo.jpg"; } if (type_alert == "3") { this.url_img = "img/thumbnailVerde.jpg"; }
    this.alerts.push({
      title_alert: title_alert,
      type_alert: type_alert,
      last_description: last_description,
      penultimate_description: "",
      antepenultimate_description: "",
      date_alert: date_alert,
      url_img: this.url_img,
      url_photo: url_photo,
      local_alert: local_alert
    });
  }

  listarPendAlertas() {
    return this.af.list('/pendAlertList', ref => ref.limitToLast(30));
  }

  listarUser() {
    return this.af.list('/users', ref => ref.limitToLast(30));

  }

  especificoAlerta(alertID) {
    return this.af.object('/alertList/' + alertID).snapshotChanges();
  }

  ultimoAlerta() {
    // tem que ter os 2 returns
    return this.af.list('alertList', ref => ref.limitToLast(1)).snapshotChanges().map(changes => {
      // Você pode acessar a key direto com o m.key em vez do m.payload.key
      return changes.map(m => ({ key: m.key, alerta: m.payload.val() }));
    });

  }

  listarAlertas() {
    return this.af.list('/alertList', ref => ref.limitToLast(30));
  }

  public getUserType() {
    // Pego o tipo do usuario logado
    return this.af.object('/users/' + this.angularFireAuth.auth.currentUser.uid).snapshotChanges().map(changes => {
        // retorno apenas a propriedade userType
        return changes.payload.val().type_user;
      });
  }
}
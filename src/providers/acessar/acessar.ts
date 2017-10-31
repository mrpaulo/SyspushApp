import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { AlertController, ActionSheetController, Item } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';
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
    return this.af.list('/pendAlertList', ref => ref.limitToLast(30)).valueChanges();
  }

  listarUser() {
    return this.af.list('/users', ref => ref.limitToLast(30)).valueChanges();

  }

  especificoAlerta(alertID) {
    return this.af.object('/alertList/' + alertID).snapshotChanges();
  }

  ultimoAlerta() {
    this.af.list('alertList', ref => ref.limitToLast(1)).snapshotChanges().map(changes => {
      return changes.map(m => ({ key: m.payload.key, alerta: m.payload.val() }));
    });

  }

  listarAlertas() {
    return this.af.list('/alertList', ref => ref.limitToLast(30)).valueChanges();
  }

  //verificaUser() {
  // firebase.auth().onAuthStateChanged(function (logadoObs) {
  //   if (logadoObs) {
  //     console.log("usuário logado no observable: ");
  //     //this.key = logadoObs.uid;
  //     //console.log("email observable: " + logadoObs.email);
  //     // this.usuario = logadoObs;        
  //     //this.e_mail = logadoObs.email;
  //   } else {
  //     console.log("Sem usuário logado no observable!");
  //   }
  // });
  //this.tipoUser(this.usuario);  



  // tipoUser(item: any) {
  //   this.logEmail = item.email;
  //   this.af.list('/users', { preserveSnapshot: true })
  //     .subscribe(snapshots => {
  //       snapshots.forEach(snapshot => {
  //         if (snapshot.val().email == this.logEmail) {
  //           this.tipo = snapshot.val().type_user;
  //           // console.log("Name: " + this.tipo);
  //           // console.log("type: " + snapshot.val().type_user);
  //           // console.log("email: " + snapshot.val().email);
  //         }
  //         // console.log("type: " + snapshot.val().type_user);
  //         // console.log("email: " + snapshot.val().email);
  //         // console.log("tipao: " + this.tipo);
  //         // console.log("emailLogado: " + this.logEmail);
  //       });
  //     })
  //   return this.tipo
  // }

  // currentUserId(): string {
  //   return this.authenticated ? this.authState.uid : 'fs3SoRYAgEUu3BSReMvlpRvkuIw2';
  // }

  verificaUser() {

    var usuarioAtual = firebase.auth().currentUser;
    if (usuarioAtual) {
      console.log("usuário logado!");

      this.user.e_mail = usuarioAtual.email;
      //this.user.id = usuarioAtual.uid;       
      // this.af.object('/users/' + usuarioAtual.uid).subscribe(user => this.user.oper = user.oper);
      console.log("userId: " + usuarioAtual.uid);
      //console.log("Operador 1: " +  this.user.oper);
    } else {
      console.log("Sem usuário logado!");
    }

    this.user.type_user = 0; //usuario anonimo = 0 
    this.user.oper = false;
    if (this.angularFireAuth.auth.currentUser) {
      //this.af.object('/users/' + this.angularFireAuth.auth.currentUser.uid).subscribe(user => this.user.oper = user.oper);
      this.af.object('/users/' + this.angularFireAuth.auth.currentUser.uid).snapshotChanges().map(user => this.user.oper = user.payload.val().oper);
    }
    console.log("Operador 2: " + this.user.oper);
    return this.user
  }

}
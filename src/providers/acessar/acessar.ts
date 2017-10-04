import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { AlertController, ActionSheetController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class AcessarProvider {
  logEmail: string;
  tipo: any;
  alerts: FirebaseListObservable<any>;
  oneAlert: FirebaseObjectObservable<any>;
  users: FirebaseListObservable<any>;
  e_mail: string;
  usuario: any;
  url_img: string;
  key: any;

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
    return this.alerts = this.af.list('/pendAlertList', {
      query: {
        limitToLast: 30
      }
    });
  }

  listarUser() {
    this.users = this.af.list('/users', {
      query: {
        limitToLast: 30
      }
    });
    return this.users
  }

  especificoAlerta(alertID) {
    this.oneAlert = this.af.object('/alertList/' + alertID, { preserveSnapshot: true });
    return this.oneAlert
  }

  ultimoAlerta() {
    return this.alerts = this.af.list('/alertList', {
      query: {
        limitToLast: 1
      }
    });
  }

  listarAlertas() {
    return this.alerts = this.af.list('/alertList', {
      query: {
        limitToLast: 30
      }
    });
  }

  verificaUser() {
    firebase.auth().onAuthStateChanged(function (logadoObs) {
      if (logadoObs) {
        console.log("usuário logado no observable: "+ logadoObs.uid);
        //this.key = logadoObs.uid;
        //console.log("email observable: " + logadoObs.email);
        // this.usuario = logadoObs;        
        //this.e_mail = logadoObs.email;
      } else {
        console.log("Sem usuário logado no observable!");
      }
    });
    //this.tipoUser(this.usuario);      
    this.usuario = firebase.auth().currentUser;
    if (this.usuario) {
      console.log("usuário logado!");
      //this.tipoUser(this.usuario);
      this.e_mail = this.usuario.email;
    } else {
      console.log("Sem usuário logado!");
    }
    return this.e_mail
  }

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

  retornaTipo() {
    //let key = this.currentUserId;//this.angularFireAuth.auth.currentUser.uid;
    
    firebase.auth().onAuthStateChanged(function (logadoObs) {
      if (logadoObs) {
        console.log("key: "+ logadoObs.uid);
       // this.key = logadoObs.uid;
      }
    });
    this.key ='fs3SoRYAgEUu3BSReMvlpRvkuIw2';
      return new Promise((resolve) => {
        //Acessando as propriedados do usuario logado
        this.usuario = this.af.object('/users/'+ this.key, { preserveSnapshot: true }).subscribe(action => {
          //acho que é assim mesmo que recupera o valor        
          resolve(action.val().type_user);
          console.log("Tipo user na promise: " + action.val().type_user);
          console.log("key: " + this.key);
        });
      });   
  }
}
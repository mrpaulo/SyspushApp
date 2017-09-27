import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

//import { Component } from '@angular/core';
import { NavController, AlertController, ActionSheetController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
//import * as _ from 'lodash';
import * as firebase from 'firebase/app';

@Injectable()
export class AcessarProvider {
  logEmail: string;
  tipo: any;
  userTipo: FirebaseListObservable<any>;
  alerts: FirebaseListObservable<any>;
  oneAlert: FirebaseObjectObservable<any>;
  urlPhoto: any;
  users: FirebaseListObservable<any>;

  nome: string;
  e_mail: string;
  usuario: any;

  url_img: string;

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public af: AngularFireDatabase,
    public actionSheetCtrl: ActionSheetController
  ) {
    //this.alerts = af.list('/alertList');
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
      url_img: this.url_img,//"img/thumbnailVermelho.jpg",
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
    //return this.oneAlert = this.af.child('/alertList').child(alertID);
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

  // obterPhoto() {
  //   this.urlPhoto = "http://res.cloudinary.com/dht8hrgql/image/upload/v1499814594/ImagensAlertas/3.jpg";
  //   return this.urlPhoto;
  // }

  verificaUser() {
    firebase.auth().onAuthStateChanged(function (logadoObs) {
      if (logadoObs) {
        console.log("usuário logado no observable!");
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
      this.tipoUser(this.usuario);
      this.e_mail = this.usuario.email;
    } else {
      console.log("Sem usuário logado!");
    }
    return this.e_mail
  }

  tipoUser(item: any) {
    this.logEmail = item.email;
    this.af.list('/users', { preserveSnapshot: true })
      .subscribe(snapshots => {
        snapshots.forEach(snapshot => {
          if (snapshot.val().email == this.logEmail) {
            this.tipo = snapshot.val().type_user;
            // console.log("Name: " + this.tipo);
            // console.log("type: " + snapshot.val().type_user);
            // console.log("email: " + snapshot.val().email);
          }
          // console.log("type: " + snapshot.val().type_user);
          // console.log("email: " + snapshot.val().email);
          // console.log("tipao: " + this.tipo);
          // console.log("emailLogado: " + this.logEmail);
        });
      })
    return this.tipo
  }

  retornaTipo(){  
    return this.tipo
  }


  addSong() {
    let prompt = this.alertCtrl.create({
      title: 'Song Name',
      message: "Enter a name for this new song you're so keen on adding",
      inputs: [
        {
          name: 'title_alert',
          placeholder: 'Title',

        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.alerts.push({
              id: 1,
              type_alert: 1,
              title_alert: data.title_alert,
              last_description: "Moradores deixar suas casas",
              penultimate_description: "Penultimo",
              antepenultimate_description: "Ante Penultimo",
              date_hour: "10/05/2017 - 20:00 h",
              url_img: "img/thumbnailVermelho.jpg",
              url_photo: "http://res.cloudinary.com/dht8hrgql/image/upload/v1499814594/ImagensAlertas/3.jpg",
              local_alert: "-29.639410, -50.787776"
            });
          }
        }
      ]
    });
    prompt.present();
  }

}
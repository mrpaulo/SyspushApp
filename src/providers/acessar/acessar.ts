import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

//import { Component } from '@angular/core';
import { NavController, AlertController, ActionSheetController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
//import * as _ from 'lodash';
import * as firebase from 'firebase/app';

@Injectable()
export class AcessarProvider {
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
    return this.users = this.af.list('/users', {
      query: {
        limitToLast: 30
      }
    });
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

  obterPhoto() {
    this.urlPhoto = "http://res.cloudinary.com/dht8hrgql/image/upload/v1499814594/ImagensAlertas/3.jpg";
    return this.urlPhoto;
  }

  verificaUser() {
    // firebase.auth().onAuthStateChanged(function (logadoObs) {
    //   if (logadoObs) {
    //     console.log("usuário logado no observable!");
    //   } else {
    //     console.log("Sem usuário logado no observable!");
    //   }
    // });      
    this.usuario = firebase.auth().currentUser;
    if (this.usuario) {
      console.log("usuário logado!");
      this.nome = this.usuario.displayName;
      this.e_mail = this.usuario.email;
      console.log("Nome: " + this.nome);
    } else {
      console.log("Sem usuário logado!");
    }
    return this.e_mail
  }
  retornaTipo() {

    let logEmail = this.verificaUser();
    this.userTipo = this.listarUser();
    // this.userTipo.subscribe(snapshot => {
    //   this.userTipo = snapshot.val();
    // }); 
    // let emailsUser = this.userTipo.email;
    console.log("Email logado" + logEmail);
    console.log("lista users" + this.userTipo);
    // if(logEmail==emailsUser){
    //   let tipo = this.userTipo?.type_user;
    // }
    // console.log("Email logado" + this.userTipo?.type_user);

    let tipo = "1"
    return tipo
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
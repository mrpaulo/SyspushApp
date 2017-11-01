import { Component } from '@angular/core';
import { NavController, AlertController, ActionSheetController, NavParams } from 'ionic-angular';

import {AngularFireDatabase} from 'angularfire2/database';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  alerts:  any;
  pushMessage: string = 'push message will be displayed here';

  constructor(
    public navCtrl: NavController, 
    public alertCtrl: AlertController, 
    af: AngularFireDatabase, 
    public actionSheetCtrl: ActionSheetController,
    public params: NavParams
  ) {
      this.alerts = af.list('/alertList');
      if (params.data.message) {
        this.pushMessage = params.data.message;
      }
  }

  addSong(){
    let prompt = this.alertCtrl.create({
      title: 'Novo alerta teste',
      message: "...",
      inputs: [
        {
          name: 'title_alert',
          placeholder: 'Título'
        },        
        {
          name: 'last_description',
          placeholder: 'Ultima descrição'
        },
        {
          name: 'penultimate_description',
          placeholder: 'Penultima descriçã'
        },
        {
          name: 'antepenultimate_description',
          placeholder: 'antepeltima descriçã'
        },
        {
          name: 'date_hour',
          placeholder: 'Data'
        },
        {
          name: 'type_alert',
          placeholder: 'Tipo'
        },
        {
          name: 'url_img',
          placeholder: 'Verde'
        },
        {
          name: 'url_photo',
          placeholder: 'Número'
        },
        {
          name: 'local_alert',
          placeholder: '-29.639410, -50.787776'
        }
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
              type_alert: 1,
              title_alert: data.title_alert,
              last_description: data.last_description,
              penultimate_description: data.penultimate_description,
              antepenultimate_description: data.antepenultimate_description,
              date_hour: data.date_hour,
              url_img: "img/thumbnail" + data.url_img + ".jpg",
              url_photo: "http://res.cloudinary.com/dht8hrgql/image/upload/v1499814594/ImagensAlertas/" + data.url_photo + ".jpg",
              local_alert: data.local_alert
            });
          }
        }
      ]
    });
    prompt.present();
  }

  // removeSong(songId: string){
  //   this.songs.remove(songId);
  // }

  // updateSong(songId, songTitle){
  //   let prompt = this.alertCtrl.create({
  //     title: 'Song Name',
  //     message: "Update the name for this song",
  //     inputs: [
  //       {
  //         name: 'title',
  //         placeholder: 'Title',
  //         value: songTitle
  //       },
  //     ],
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         handler: data => {
  //           console.log('Cancel clicked');
  //         }
  //       },
  //       {
  //         text: 'Save',
  //         handler: data => {
  //           this.songs.update(songId, {
  //             title: data.title
  //           });
  //         }
  //       }
  //     ]
  //   });
  //   prompt.present();
  // }

  // showOptions(songId, songTitle) {
  //   let actionSheet = this.actionSheetCtrl.create({
  //     title: 'What do you want to do?',
  //     buttons: [
  //       {
  //         text: 'Delete Song',
  //         role: 'destructive',
  //         handler: () => {
  //           this.removeSong(songId);
  //         }
  //       },{
  //         text: 'Update title',
  //         handler: () => {
  //           this.updateSong(songId, songTitle);
  //         }
  //       },{
  //         text: 'Cancel',
  //         role: 'cancel',
  //         handler: () => {
  //           console.log('Cancel clicked');
  //         }
  //       }
  //     ]
  //   });
  //   actionSheet.present();
  // }

}
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { AcessarProvider } from "../../providers/acessar/acessar";
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from "angularfire2/database";
import { FormBuilder, FormGroup } from "@angular/forms";
import { LocalizarProvider } from "../../providers/localizar/localizar";
import { InCioPage } from "../in-cio/in-cio";
import { Camera, CameraOptions } from '@ionic-native/camera';
//import { File } from '@ionic-native/file';
//import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { FirebaseApp } from 'angularfire2';
import * as firebase from 'firebase/app';

@Component({
  selector: 'page-enviar-alerta',
  templateUrl: 'enviar-alerta.html',
  providers: [
    AcessarProvider,
    LocalizarProvider,
    Camera
  ]
})
export class EnviarAlertaPage {
  
  url: string;  
  pendAlert: FirebaseObjectObservable<any>;
  photo: any;
  form: FormGroup;
  local: any;
  dataString: string;

  public base64Image: string;

  constructor(
    public navCtrl: NavController,
    public ap: AcessarProvider,
    public navParams: NavParams,
    public af: AngularFireDatabase,
    public lp: LocalizarProvider,
    private formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    private camera: Camera,
    private loadingCtrl: LoadingController,    
    private fb: FirebaseApp    
  ) {
    this.form = this.formBuilder.group({
      title_alert: [''],
      type_alert: [''],
      last_description: ['']
    });
  }

  sendAlert() {
    let autor = this.ap.verificaUser().e_mail;
    let photo = this.obterPhoto();
    let local = this.lp.obterLocal();
    let dataAgora = new Date();
    this.dataString = dataAgora.toString();   
    this.pendAlert = this.af.object('/pendAlertList/'+this.dataString);
    this.pendAlert.set({
      date_alert: this.dataString,
      title_alert: this.form.value.title_alert,
      type_alert: this.form.value.type_alert,
      last_description: this.form.value.last_description,
      local_alert: 'local',
      url_photo: photo,
      autor: autor      
    })
    // firebase.database().ref().child('/teste/').child(this.dataString).push({
    //   localizar: "local"
    // })
    let prompt = this.alertCtrl.create({
      title: 'Syspush diz:',
      message: "Alerta enviado com sucesso! Agora aguarde aprovação do moderador!",
      buttons: [{ text: 'Ok' }]
    });
    prompt.present();
    this.navCtrl.setRoot(InCioPage);
  }

  // takePicture() {
  //   this.camera.getPicture({
  //     destinationType: this.camera.DestinationType.DATA_URL,
  //     targetWidth: 1000,
  //     targetHeight: 1000
  //   }).then((imageData) => {
  //     // imageData is a base64 encoded string
  //     this.base64Image = "data:image/jpeg;base64," + imageData;
  //     this.uploadFile(imageData);
  //   }, (err) => {
  //     console.log(err);
  //   });
  // }
  takePicture() {
    var options: CameraOptions = {
      destinationType: 1,
      sourceType: 1,
      encodingType: 0,
      quality:60,
      allowEdit: false,
      saveToPhotoAlbum: false
  };

    this.camera.getPicture(options).then((imageData) => {    
      var img = imageData;     //'data:image/jpeg;base64,' + 
    }, (err) => {
      // Handle error
      alert(err);
    });
  }
  

  //solução com o storage do FireBase (em andamento...)
  public obterPhoto() {       
      // let storageRef = this.fb.storage().ref();      
      // let fullPath = '/fotos/' + this.dataString + '.png';
      // let uploadTask = storageRef.child(fullPath).putString(fileToUpload, 'base64');

      // uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      // (error) => {
      //   console.error(error);
      // },
      // () => {
      //   this.url = uploadTask.snapshot.downloadURL;
      //   this.save(contact);
      // });    
      return "http://res.cloudinary.com/dht8hrgql/image/upload/v1499814594/ImagensAlertas/3.jpg"
  }
  //fim solução 

}
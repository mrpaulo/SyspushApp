import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { AcessarProvider } from "../../providers/acessar/acessar";
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { FormBuilder, FormGroup } from "@angular/forms";
import { LocalizarProvider } from "../../providers/localizar/localizar";
import { InCioPage } from "../in-cio/in-cio";
import { Camera /*CameraOptions*/ } from '@ionic-native/camera';
//import { File } from '@ionic-native/file';
//import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
//import { FirebaseApp } from 'angularfire2';
//import * as firebase from 'firebase';

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
  //apiEndPoint: any = 'https://api.cloudinary.com/v1_1/dht8hrgql/image/upload';//'https://photocloudapp.herokuapp.com/api/v1/post/upload';
  pendAlert: FirebaseListObservable<any>;
  photo: any;
  form: FormGroup;
  local: any;
  dataString: string;

  // postTitle: any;
  // desc: any;
  // imageChosen: any = 0;
  // imagePath: any;
  // imageNewPath: any;
  // filetransfer: any;

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
    //private fb: FirebaseApp
    //public transfer: FileTransferObject,
    //public file: File
  ) {
    this.form = this.formBuilder.group({
      title_alert: [''],
      type_alert: [''],
      last_description: ['']
    });
  }

  sendAlert() {
    let autor = this.ap.verificaUser();
    let photo = this.obterPhoto();
    let local = this.lp.obterLocal();
    let dataAgora = new Date();
    this.dataString = dataAgora.toString();
    console.log("Data Alerta: "+dataAgora);
    this.pendAlert = this.af.list('/pendAlertList');
    this.pendAlert.push({
      date_alert: this.dataString,
      title_alert: this.form.value.title_alert,
      type_alert: this.form.value.type_alert,
      last_description: this.form.value.last_description,
      local_alert: local,
      url_photo: photo,
      autor: autor      
    })

    let prompt = this.alertCtrl.create({
      title: 'Syspush diz:',
      message: "Alerta enviado com sucesso! Agora aguarde aprovação do moderador!",
      buttons: [{ text: 'Ok' }]
    });
    prompt.present();
    this.navCtrl.setRoot(InCioPage);
  }

  takePicture() {
    this.camera.getPicture({
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth: 1000,
      targetHeight: 1000
    }).then((imageData) => {
      // imageData is a base64 encoded string
      this.base64Image = "data:image/jpeg;base64," + imageData;
      this.uploadFile(imageData);
    }, (err) => {
      console.log(err);
    });
  }

  //solução com o storage do FireBase (em andamento...)
  public obterPhoto() {       
      // let storageRef = this.fb.storage().ref();
      // let basePath = '/fotos/' + this.dataString;
      // let fullPath = basePath + '/' + this.form.value.title_alert + '.png';
      // let uploadTask = storageRef.child(fullPath).putString(item.fileToUpload, 'base64');

      // uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      // (snapshot) => {
      //   var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      //   console.log(progress + "% done");
      // },
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

  //js puro - Não funcionou
  cloudName: any = 'dht8hrgql';
  unsignedUploadPreset: any = 'zq35ikx2';
  // *********** Upload file to Cloudinary ******************** //
  uploadFile(file) {
    let loader = this.loadingCtrl.create({
      content: "Aguarde..."
    });
    loader.present();
    var url = `https://api.cloudinary.com/v1_1/${this.cloudName}/upload`;
    var xhr = new XMLHttpRequest();
    var fd = new FormData();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

    xhr.onreadystatechange = function (e) {
      if (xhr.readyState == 4 && xhr.status == 200) {
        // File uploaded successfully
        var response = JSON.parse(xhr.responseText);
        // https://res.cloudinary.com/cloudName/image/upload/v1483481128/public_id.jpg
        var url = response.secure_url;
        alert("url: " + url);
        //this.getUrlFoto(url);
      }
    };

    fd.append('upload_preset', this.unsignedUploadPreset);
    fd.append('tags', 'Syspush'); // Optional - add tag for image admin in Cloudinary
    fd.append('file', file);
    xhr.send(fd);
  }

  getUrlFoto(url){
    return url;
  }

}
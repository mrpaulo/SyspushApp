import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { AcessarProvider } from "../../providers/acessar/acessar";
import { AngularFireDatabase } from "angularfire2/database";
import { FormBuilder, FormGroup } from "@angular/forms";
import { LocalizarProvider } from "../../providers/localizar/localizar";
import { InCioPage } from "../in-cio/in-cio";
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FirebaseApp } from 'angularfire2';
import * as firebase from 'firebase';

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
  autor: string;
  img: any;
  pendAlert: any;
  photo: any;
  form: FormGroup;
  local: any;
  dataString: string;
  
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
    //this.img = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAEAAUDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD3uCCG1t4re3ijhgiQJHHGoVUUDAAA4AA4xRRRQB//2Q==";
    this.form = this.formBuilder.group({
      title_alert: [''],
      type_alert: [''],
      last_description: ['']
    });
  }

  sendAlert() {
    let dataAgora = new Date();
    this.dataString = dataAgora.toString();
    var usuarioAtual = firebase.auth().currentUser;
    if (usuarioAtual) {
      this.autor = usuarioAtual.email;
    }

    if (this.img) {
      const loading = this.loadingCtrl.create({
        content: 'Carregando foto, aguarde...'
      });
      loading.present();
      let storageRef = firebase.storage().ref();
      let fullPath = '/fotos/' + this.dataString + '.jpg';
      //tentativa1
      // storageRef.child(fullPath).putString(this.img, firebase.storage.StringFormat.DATA_URL).then((save) => {        
      //   this.photo = save.downloadURL,
      //     (error) => {
      //       loading.dismiss();
      //       alert("Erro ao fazer upload: " + error);
      //     }
      // });
      //tentativa2
      let uploadTask = storageRef.child(fullPath).putString(this.img, firebase.storage.StringFormat.DATA_URL);
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) => {
          this.photo = uploadTask.snapshot.downloadURL
        },
        (error) => {
          console.error("Erro do Firebase:" + error);
        });
      //tentativa3
      // storageRef.child(fullPath).putString(this.img, firebase.storage.StringFormat.DATA_URL);
      // storageRef.child(fullPath).getDownloadURL().then(function (url) {
      //   this.photo = url
      // }).catch(function (error) {
      //   console.error("Erro do Firebase:" + error);
      // });

      this.photo = "https://firebasestorage.googleapis.com/v0/b/syspush-prmr.appspot.com/o/fotos%2FFri%20Nov%2003%202017%2010%3A23%3A04%20GMT-0200%20(BRST).jpg?alt=media&token=fc59ed5d-c299-4c96-b0b6-919d9d37177a";
      //https://firebasestorage.googleapis.com/v0/b/syspush-prmr.appspot.com/o/fotos%2FThu%20Nov%2002%202017%2019%3A35%3A41%20GMT-0300%20(BRT).jpg?alt=media&token=d6f71ead-759f-44f2-af7f-25880c346b10
      //this.photo = 'gs://syspush-prmr.appspot.com/fotos/' + this.dataString + '.jpg';
      //console.log("photo: " + this.photo);
      loading.dismiss()
    } else {
      this.photo = "https://firebasestorage.googleapis.com/v0/b/syspush-prmr.appspot.com/o/img%2Fnot-found.jpg?alt=media&token=fcec94c1-9f05-4bbe-84a8-90da92924a45";
    }
    let local = this.lp.obterLocal();
    this.pendAlert = this.af.object('/pendAlertList/' + this.dataString);
    this.pendAlert.set({
      date_alert: this.dataString,
      title_alert: this.form.value.title_alert,
      type_alert: this.form.value.type_alert,
      last_description: this.form.value.last_description,
      local_alert: local,
      url_photo: this.photo,
      autor: this.autor
    });
    let prompt = this.alertCtrl.create({
      title: 'Syspush diz:',
      message: "Alerta enviado com sucesso! Agora aguarde aprovação do moderador!",
      buttons: [{ text: 'Ok' }]
    });
    prompt.present();
    this.navCtrl.setRoot(InCioPage);
  }

  takePicture() {
    var options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
    };

    this.camera.getPicture(options).then((imageData) => {
      this.img = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      alert("Erro ao tirar foto: " + err);
    });
  }

  public cancelar() {
    this.navCtrl.setRoot(InCioPage);
  }
}


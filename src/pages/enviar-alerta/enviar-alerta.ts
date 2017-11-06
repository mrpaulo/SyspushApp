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
  photo: string;
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
    //imagem qualquer para testar no navegador
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

    // if (this.img) {
    //   const loading = this.loadingCtrl.create({
    //     content: 'Carregando foto, aguarde...'
    //   });
    //   loading.present();
    //   let storageRef = firebase.storage().ref();
    //   let fullPath = '/fotos/' + this.dataString + '.jpg';
    //   //tentativa1 ERROR Error: Reference.set failed: First argument contains undefined in property //e//ERROR CONTEXT 
    //   storageRef.child(fullPath).putString(this.img, firebase.storage.StringFormat.DATA_URL).then((save) => {
    //     this.photo = save.downloadURL,
    //       (error) => {
    //         loading.dismiss();
    //         console.error("Erro do Firebase:" + error.code);
    //       }
    //   });
    //   //tentativa2 ERROR Error: Reference.set failed: First argument contains undefined in property //e//ERROR CONTEXT 
    //   // let uploadTask = storageRef.child(fullPath).putString(this.img, firebase.storage.StringFormat.DATA_URL);
    //   // uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
    //   //   (snapshot) => {
    //   //     this.photo = uploadTask.snapshot.downloadURL
    //   //   },
    //   //   (error) => {
    //   //     console.error("Erro do Firebase:" + error);
    //   //   });

    //   //tentativa3 Error code de "storage/object_not_found"
    //   //storageRef.child(fullPath).putString(this.img, 'base64');
    //   //this.photo = storageRef.child(fullPath).getDownloadURL().then(function (url) {
    //   //   return url
    //   // }).catch(function (error) {
    //   //   console.error("Erro do Firebase:" + error.code);
    //   // });

    //   //tentativa 4 (exatamente igual ao do documento do firebase store) Error: [object Object]
    //   // let uploadTask = storageRef.child(fullPath).putString(this.img, 'base64');
    //   // uploadTask.on('state_changed', function(snapshot){        
    //   //   console.log('Upload is done');        
    //   // }, function(error) {
    //   //   console.error("Erro do Firebase:" + error);
    //   // }, function() {        
    //   //   this.photo = uploadTask.snapshot.downloadURL;
    //   // });
    //   //url parecida que deveria vir
    //   this.photo = "https://firebasestorage.googleapis.com/v0/b/syspush-prmr.appspot.com/o/fotos%2FFri%20Nov%2003%202017%2010%3A23%3A04%20GMT-0200%20(BRST).jpg?alt=media&token=fc59ed5d-c299-4c96-b0b6-919d9d37177a";

    //   console.log("this.photo : " + this.photo);
    //   loading.dismiss()
    // } else {
    //   this.photo = "https://firebasestorage.googleapis.com/v0/b/syspush-prmr.appspot.com/o/img%2Fnot-found.jpg?alt=media&token=fcec94c1-9f05-4bbe-84a8-90da92924a45";
    // }
    if (!this.form.value.type_alert) {
      this.form.value.type_alert = "3";
    }
    this.local = this.lp.obterLocal();
    this.pendAlert = this.af.object('/pendAlertList/' + this.dataString);
    // this.pendAlert.set({
    //   date_alert: this.dataString,
    //   title_alert: this.form.value.title_alert,
    //   type_alert: this.form.value.type_alert,
    //   last_description: this.form.value.last_description,
    //   local_alert: this.local,
    //   url_photo: 'this.photo',
    //   autor: this.autor
    // });
    this.save(this.pendAlert, this.img);

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

  save(item: any, img: any) {

    const alerta = {
      date_alert: this.dataString,
      title_alert: this.form.value.title_alert,
      type_alert: this.form.value.type_alert,
      last_description: this.form.value.last_description,
      local_alert: this.local,
      url_photo: '',
      autor: this.autor
    };

    if (item.key) {      
      item.update(alerta).then(() => {
        if (img) {
          this.uploadImg(item.key, img);
        }
      });

    } else {
      this.af.object('/pendAlertList/' + this.dataString).set(alerta).then((result: any) => {
        if (img) {
          this.uploadImg(this.dataString, img);
        }
      });
    }
  }

  uploadImg(key: string, img: any) {//tive que colocar any porque o putString disse que tinha que ser
    const storageRef = this.fb.storage().ref();
    const uploadTask = storageRef.child('/fotos/' + key).putString(img, firebase.storage.StringFormat.DATA_URL);

    // A task tem 3 metodos que precisam ser implementados  
    // 1 - Progresso do upload  
    // 2 - Quando ocorre erro  
    // 3 - Quando o upload é finalizado com sucesso  
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot:
        any) => {
        // Enquanto a img está sendo enviada esse metodo é chamado  
        // const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        // upload failed  
        console.log(error);
      },
      () => {
        // Em caso de sucesso eu atualizo o objeto com a url  
        this.af.object('/pendAlertList/' + key).update({
          url_photo: uploadTask.snapshot.downloadURL
        });
      }
    );
  }

}


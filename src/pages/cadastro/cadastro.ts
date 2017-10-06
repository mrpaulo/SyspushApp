import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { LocalizarProvider } from "../../providers/localizar/localizar";
import { AcessarProvider } from "../../providers/acessar/acessar";
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from "angularfire2/database";

import { FormBuilder, FormGroup } from "@angular/forms";
import { InCioPage } from '../in-cio/in-cio';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
  providers: [
    AcessarProvider,
    LocalizarProvider
  ]
})
export class CadastroPage {
  user: FirebaseObjectObservable<any>;
  //user: FirebaseListObservable<any>;
  preCoordenadas: any;
  coordenadas: any;
  form : FormGroup;
  
  constructor(public navCtrl: NavController,
    public ap: AcessarProvider,
    public navParams: NavParams,
    public af: AngularFireDatabase,
    public lp: LocalizarProvider,
    private formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    private angularFireAuth: AngularFireAuth,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
  ) {   
    this.form = this.formBuilder.group({
      name: [''],
      cellphone: [''],
      email: [''],
      password: [''], 
      localizar: []
    }); 
    this.preCoordenadas = this.lp.obterLocal();
  }  
  
  
  cadastrar(){
    const loading = this.loadingCtrl.create({
      content: 'Por favor, aguarde...'
    });
    loading.present();
    firebase.auth().createUserWithEmailAndPassword(this.form.value.email, this.form.value.password).then(
     () => { 
      if (this.form.value.localizar){
        this.coordenadas = this.preCoordenadas;
      }else {this.coordenadas = 0;}
      
      this.user = this.af.object('/users/' + this.angularFireAuth.auth.currentUser.uid);
      //this.user = this.af.list('/users');
      this.user.set({
      //this.user.push({ 
        name: this.form.value.name,
        cellphone: this.form.value.cellphone,
        email: this.form.value.email,
        password: this.form.value.password,//depois de instalar o "md5" Md5.hashStr(password)
        local: this.coordenadas,
        type_user: 1      
      });
    } 
    ).catch(function(error) {
      (error) => {
        loading.dismiss();
        let toast = this.toastCtrl.create({ duration: 3500, position: 'bottom' });
        if (error.code == 'auth/email-already-in-use') {
          toast.setMessage('O e-mail digitado já está em uso.');
        } else if (error.code == 'auth/invalid-email') {
          toast.setMessage('O e-mail digitado não é valido.');
        } else if (error.code == 'auth/operation-not-allowed') {
          toast.setMessage('Operação não permitida. Você já está logado?');
        } else if (error.code == 'auth/weak-password') {
          toast.setMessage('A senha digitada curta! Ela deve ter 6 caracteres.');
        }
        toast.present();
        this.hasError = true;
      var errorMessage = error.message;
      console.log("Erro criar auth: " + errorMessage);
      }
      // ...
    });
    loading.dismiss();
       
         
    // let prompt = this.alertCtrl.create({
    //   title: 'Syspush diz:',
    //   message: "Cadastro realizado com sucesso!",
    //   buttons: [{text: 'Ok'}]
    // });
    // prompt.present();
    this.navCtrl.setRoot(InCioPage);
  }  
}

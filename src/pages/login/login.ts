import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { CadastroPage } from '../cadastro/cadastro';
import { AngularFireDatabase } from "angularfire2/database";
import { FormBuilder, FormGroup } from "@angular/forms";
import { AcessarProvider } from "../../providers/acessar/acessar";
import { LocalizarProvider } from "../../providers/localizar/localizar";
import { AuthProvider } from '../../providers/auth/auth';
import { AngularFireAuth } from "angularfire2/auth";
import { InCioPage } from "../in-cio/in-cio";
import * as firebase from 'firebase/app';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [
    AcessarProvider,
    LocalizarProvider,
    AuthProvider,
    AngularFireAuth
  ]
})
export class LoginPage {
  users:  any;
  tipoUser: any;
  user:  any;
  form: FormGroup;
  hasError: boolean;
  errorMessage: string;
  flag = true;// se falso aparece a informação
  // nome: string;
  e_mail: string = null;
  // usuario: any;

  constructor(public navCtrl: NavController,
    public ap: AcessarProvider,
    public navParams: NavParams,
    public af: AngularFireDatabase,
    public lp: LocalizarProvider,
    private formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private auth: AuthProvider
  ){

    this.form = this.formBuilder.group({
      email: [''],
      password: ['']
    });
    
    this.e_mail = ap.verificaUser().e_mail;
    if (this.e_mail) {
      this.flag = false;      
    }
       
  } 

  sair() {
    firebase.auth().signOut().then(function () {
      console.log("Saiu com sucesso!");
      this.flag = true;
    }).catch(function (error) {
      console.log("Erro ao sair");
    });
    this.navCtrl.setRoot(InCioPage);
  }

  cadastrar() {
    const loading = this.loadingCtrl.create({
      content: 'Por favor, aguarde...'
    });
    loading.present();

    this.auth.signInWithEmailAndPassword(this.form.value.email, this.form.value.password)
      .then(() => {
        loading.dismiss();
        this.navCtrl.setRoot(InCioPage);
      }, (error) => {
        loading.dismiss();
        let toast = this.toastCtrl.create({ duration: 3500, position: 'bottom' });
        if (error.code == 'auth/invalid-email') {
          toast.setMessage('O e-mail digitado não é valido.');
        } else if (error.code == 'auth/user-disabled') {
          toast.setMessage('O usuário está desativado.');
        } else if (error.code == 'auth/user-not-found') {
          toast.setMessage('O usuário não foi encontrado.');
        } else if (error.code == 'auth/wrong-password') {
          toast.setMessage('A senha digitada não é valida.');
        }
        toast.present();
        this.hasError = true;
      });
  }

  goToCadastro(params) {
    if (!params) params = {};
    this.navCtrl.push(CadastroPage);
  }
}
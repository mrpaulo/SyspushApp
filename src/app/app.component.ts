import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AlertaDetalhadoPage } from '../pages/alerta-detalhado/alerta-detalhado';
import { FotoDoAlertaPage } from '../pages/foto-do-alerta/foto-do-alerta';
import { MapaPage } from '../pages/mapa/mapa';
import { EnviarAlertaPage } from '../pages/enviar-alerta/enviar-alerta';
import { HistRicoAlertaPage } from '../pages/hist-rico-alerta/hist-rico-alerta';
import { ConfiguraEsPage } from '../pages/configura-es/configura-es';
import { LoginPage } from '../pages/login/login';
import { CadastroPage } from '../pages/cadastro/cadastro';
import { SobrePage } from '../pages/sobre/sobre';
import { InCioPage } from '../pages/in-cio/in-cio';
import { UserListaPage } from "../pages/user-lista/user-lista";
import { AlertasPendPage } from "../pages/alertas-pend/alertas-pend";
import { EditarAlertasPage } from "../pages/editar-alertas/editar-alertas";
import { AcessarProvider } from "../providers/acessar/acessar";
import { OneSignal } from '@ionic-native/onesignal';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) navCtrl: Nav;
  rootPage: any = InCioPage;
  userCadastrado = false;
  userOperador = false;
  tipo: string;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    public alertCtrl: AlertController,
    public ap: AcessarProvider,
    public one: OneSignal
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.         
      statusBar.styleDefault();
      splashScreen.hide();
      //this.tipoUser();
      //this.initPush();      
      this.ap.retornaTipo()
        .then((tipo) => {
          this.tipoUser(tipo);
          console.log("Tipo novo: " + tipo);
          //preecho alguma propriedade com o tipo do usuario.
        })

    });
    if (platform.is('cordova')) {
      this.initPush();
    }
  }
  //inicio init push - ainda não funciona
  initPush() {
    this.one.startInit("7812b1be-0fbf-4494-b24f-0bf908c5b2aa", "105371248958");
    this.one.inFocusDisplaying(this.one.OSInFocusDisplayOption.InAppAlert);
    this.one.handleNotificationReceived().subscribe(() => {
      // do something when notification is received
      alert("One signal recebido!!!");
    });
    this.one.handleNotificationOpened().subscribe(() => {
      // do something when a notification is opened
      alert("One signal aberto!!!");
    });
    this.one.endInit();
  }

  tipoUser(tipo) {// preciso retornar o tipo aqui para mostrar ou não itens do menu, a informacao esta sendo gerado no arquivo acessar.ts 
    //tipo = "2";//ap.retornaTipo();
    if (tipo == "1") {
      this.userCadastrado = true;
    }
    if (tipo == "2") {
      this.userCadastrado = true;
      this.userOperador = true;
    }
  }

  goToAlertaDetalhado(params) {
    if (!params) params = {};
    this.navCtrl.setRoot(AlertaDetalhadoPage);
  }
  goToFotoDoAlerta(params) {
    if (!params) params = {};
    this.navCtrl.setRoot(FotoDoAlertaPage);
  }
  goToMapa(params) {
    if (!params) params = {};
    this.navCtrl.setRoot(MapaPage);
  }
  goToEnviarAlerta(params) {
    if (!params) params = {};
    this.navCtrl.setRoot(EnviarAlertaPage);
  }
  goToHistRicoAlerta(params) {
    if (!params) params = {};
    this.navCtrl.setRoot(HistRicoAlertaPage);
  }
  goToConfiguraEs(params) {
    if (!params) params = {};
    this.navCtrl.setRoot(ConfiguraEsPage);
  }
  goToLogin(params) {
    if (!params) params = {};
    this.navCtrl.setRoot(LoginPage);
  }
  goToCadastro(params) {
    if (!params) params = {};
    this.navCtrl.setRoot(CadastroPage);
  }
  goToSobre(params) {
    if (!params) params = {};
    this.navCtrl.setRoot(SobrePage);
  }
  goToInCio(params) {
    if (!params) params = {};
    this.navCtrl.setRoot(InCioPage);
  }
  goToAlertPend(params) {
    if (!params) params = {};
    this.navCtrl.setRoot(AlertasPendPage);
  }
  goToUserList(params) {
    if (!params) params = {};
    this.navCtrl.setRoot(UserListaPage);
  }
  goToEditarAlertas(params) {
    if (!params) params = {};
    this.navCtrl.setRoot(EditarAlertasPage);
  }

}
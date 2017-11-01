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
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  type_user: Observable<any>;;
  @ViewChild(Nav) navCtrl: Nav;
  rootPage: any = InCioPage;
  userCadastrado = false;
  userOperador = false;
  tipo: string;

  pages: Array<{ title: string, component: any, openNew: boolean, visible: boolean }>;
  userType: number = 0; // Anonimo


  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    public alertCtrl: AlertController,
    public ap: AcessarProvider,
    private angularFireAuth: AngularFireAuth
  ) { 
    this.handlerUserType();
    this.createMenu();   
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.         
      statusBar.styleDefault();
      splashScreen.hide();            
    });
  }

  createMenu() {
    // userType = 0 - usuário anonimo
    // userType = 1 - usuario comum
    // userType = 2 - usuario administrador
    this.pages = [
      // Visivel para todos
      { title: 'Início', component: InCioPage, openNew: false, visible: this.userType >= 0 },
      { title: 'Histórico de Alertas', component: HistRicoAlertaPage, openNew: false, visible: this.userType >= 0 },
      // Visivel para usuarios comuns e administradores
      { title: 'Enviar Alerta', component: EnviarAlertaPage, openNew: false, visible: this.userType >= 1 },
      // Visivel para todos
      { title: 'Configurações', component: ConfiguraEsPage, openNew: false, visible: this.userType >= 0 },      
      { title: 'Login', component: LoginPage, openNew: false, visible: this.userType >= 0 },      
      // Visivel somente para administradores
      { title: 'Editar Usuários', component: UserListaPage, openNew: false, visible: this.userType == 2 },
      { title: 'Alertas Pendentes', component: AlertasPendPage, openNew: false, visible: this.userType == 2 },
      { title: 'Editar Alertas', component: EditarAlertasPage, openNew: false, visible: this.userType == 2 },
      // Visivel para todos
      { title: 'Sobre', component: SobrePage, openNew: false, visible: this.userType >= 0 },  
    ];
  }

  openPage(page) {
    // Aqui é possivel fazer outros tipos de logica, como por exemplo o codigo comentado
    // if (page.component == 'SigninPage' || page.component == 'SignupPage') {
    //   this.nav.push(page.component);
    // } else if (page.component == 'NOME_DA_PAGINA') {
    //   // Fazer qualquer tipo de ação como por exemplo chamar um metodo de logout
    //   // this.accountProvider.signOut();
    // } else {
    //   this.nav.setRoot(page.component);
    // }

    if (page.openNew) {
      this.navCtrl.push(page.component);
    } else {
      this.navCtrl.setRoot(page.component);
    }
  }

  handlerUserType() {
    // Faço um subscribe no estado do usuario para saber quando ele está logado.
    // Ao criar um conta o usuario é automaticamente autenticado no firebase
    this.angularFireAuth.authState.subscribe(user => {
      if (user) { // Usuario logado
        // Faço um subscribe para pegar o tipo do usuario
        let userTypeSubscribe = this.ap.getUserType().subscribe((userType: number) => {
          // passo para a propriedade
          this.userType = userType;
          // Recrio o menu para exibir o que esse tipo de usuario pode ver
          this.createMenu();
          // Finalizo o subscribe pois não preciso ficar monitorando o tipo do usuario.
          userTypeSubscribe.unsubscribe();
        })
      } else { // Usuario deslogado
        // Volto para o tipo de usuario anonimo
        this.userType = 0;
        // Recrio o menu para exibir o que esse tipo de usuario pode ver
        this.createMenu();
      }
    });
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
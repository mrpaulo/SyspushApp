import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { InCioPage } from '../pages/in-cio/in-cio';
import { HistRicoAlertaPage } from '../pages/hist-rico-alerta/hist-rico-alerta';
import { EnviarAlertaPage } from '../pages/enviar-alerta/enviar-alerta';
import { ConfiguraEsPage } from '../pages/configura-es/configura-es';
import { LoginPage } from '../pages/login/login';
import { SobrePage } from '../pages/sobre/sobre';
import { FotoDoAlertaPage } from '../pages/foto-do-alerta/foto-do-alerta';
import { AlertaDetalhadoPage } from '../pages/alerta-detalhado/alerta-detalhado';
import { MapaPage } from '../pages/mapa/mapa';
import { CadastroPage } from '../pages/cadastro/cadastro';

import { AngularFireModule } from 'angularfire2';
import { /*AngularFireDatabase, */ AngularFireDatabaseModule } from "angularfire2/database";
import { AcessarProvider } from '../providers/acessar/acessar';
import { LocalizarProvider } from '../providers/localizar/localizar';
import { AuthProvider } from '../providers/auth/auth';
import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMaps } from "@ionic-native/google-maps";
import { UserListaPage } from "../pages/user-lista/user-lista";
import { AlertasPendPage } from "../pages/alertas-pend/alertas-pend";
import { EditarAlertasPage } from "../pages/editar-alertas/editar-alertas";
import { AngularFireAuth } from 'angularfire2/auth';
import { Push } from "@ionic-native/push";
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';

const cloudSettings: CloudSettings = {
 'core': {
   'app_id': '0308e312'
 },
 'push': {
   'sender_id': '105371248958',
   'pluginConfig': {
     'ios': {
       'badge': true,
       'sound': true
     },
     'android': {
       'iconColor': '#ff0000'
     }
   }
 }
};

const firebaseConfig = {
  apiKey: 'AIzaSyCqnIxiNh5V5vUFC2svytMYBcXmLz2zRdE',
  authDomain: 'syspush-prmr.firebaseapp.com',
  databaseURL: 'https://syspush-prmr.firebaseio.com',
  projectId: 'syspush-prmr',
  storageBucket: 'syspush-prmr.appspot.com',
  messagingSenderId: '105371248958'
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    InCioPage,
    HistRicoAlertaPage,
    EnviarAlertaPage,
    ConfiguraEsPage,
    LoginPage,
    SobrePage,
    FotoDoAlertaPage,
    AlertaDetalhadoPage,
    MapaPage,
    CadastroPage,
    UserListaPage,
    AlertasPendPage,
    EditarAlertasPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    InCioPage,
    HistRicoAlertaPage,
    EnviarAlertaPage,
    ConfiguraEsPage,
    LoginPage,
    SobrePage,
    FotoDoAlertaPage,
    AlertaDetalhadoPage,
    MapaPage,
    CadastroPage,
    UserListaPage,
    AlertasPendPage,
    EditarAlertasPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AcessarProvider,
    LocalizarProvider,
    AuthProvider,
    Geolocation,
    GoogleMaps,
    AngularFireAuth,
    Push
  ]
})
export class AppModule {}

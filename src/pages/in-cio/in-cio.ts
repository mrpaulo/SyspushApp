import { Observable } from 'rxjs/Observable';
import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { AlertaDetalhadoPage } from '../alerta-detalhado/alerta-detalhado';
import { FotoDoAlertaPage } from '../foto-do-alerta/foto-do-alerta';
import { MapaPage } from '../mapa/mapa';
//import { FirebaseListObservable } from "angularfire2/database";
import { AcessarProvider } from "../../providers/acessar/acessar";
import { Push, PushObject, PushOptions } from '@ionic-native/push';

@Component({
  selector: 'page-in-cio',
  templateUrl: 'in-cio.html',
  providers: [
    AcessarProvider
  ]
})
export class InCioPage {
  tipoUser: void;

  users: any;
  // não pode ser apenas any tem que ser Observable<any>
  public alerts: Observable<any>;
  public retorno: any;

  constructor(
    public navCtrl: NavController,
    public ap: AcessarProvider,
    private push: Push, public platform: Platform
  ) {
    this.alerts = ap.ultimoAlerta();    
  }
  //inicio push
  ngOnInit() {
    if (this.platform.is('Android')) {
      // to check if we have permission
      this.push.hasPermission()
        .then((res: any) => {

          if (res.isEnabled) {
            alert('Com permissão para push notifications');
          } else {
            alert('Sem permissão para push notifications');
          }

        });

      // to initialize push notifications

      const options: PushOptions = {
        android: { },
        ios: {
          alert: 'true',
          badge: true,
          sound: 'true'
        },
        windows: {},
        browser: {
          pushServiceURL: 'http://push.api.phonegap.com/v1/push'
        }
      };

      const pushObject: PushObject = this.push.init(options);

      pushObject.on('notification').subscribe((notification: any) => alert(notification.title + ': ' + notification.text)); //console.log('Received a notification', notification));

      pushObject.on('registration').subscribe((registration: any) => alert('Device registered' + registration));

      pushObject.on('error').subscribe(error => alert('Error with Push plugin' + error));
    }
    else{
      console.log("Push notication somente Android")
    }
  }
  //fim push

  goToAlertaDetalhado(params) {    
    if (!params) params = {};
    this.navCtrl.push(AlertaDetalhadoPage, {
      key: params
    });
  }
  goToFotoDoAlerta(params) { 
    if (!params) params = {};   
    this.navCtrl.push(FotoDoAlertaPage, {
      key: params
      //,alerta: this.alerts
    });
  }
  goToMapa(params) {
    if (!params) params = {};
    // Quando vc tiver o elemento passa ele em vez de passar o Id
    this.navCtrl.push(MapaPage, {
      key: params
      //,alerta: this.alerts
    });
  }
}

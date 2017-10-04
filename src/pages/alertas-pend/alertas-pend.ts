import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, ActionSheetController } from 'ionic-angular';
import { AcessarProvider } from "../../providers/acessar/acessar";
import { FirebaseListObservable } from "angularfire2/database";
import { FotoDoAlertaPage } from '../foto-do-alerta/foto-do-alerta';
import { MapaPage } from '../mapa/mapa';

@IonicPage()
@Component({
  selector: 'page-alertas-pend',
  templateUrl: 'alertas-pend.html',
  providers: [
    AcessarProvider
  ]
})
export class AlertasPendPage {
  public alerts: FirebaseListObservable<any>;

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController, 
    public ap: AcessarProvider,
    public actionSheetCtrl: ActionSheetController    
  ) {
    this.alerts = ap.listarPendAlertas();
    
  }  

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad AlertasPendPage');
  // }
  removeAlert(alertId: string){
    this.alerts.remove(alertId);
  }

  updateAlert(alertId, title_alert, type_alert, last_description){
    let prompt = this.alertCtrl.create({
      message: "Editar Alerta (Título e Descrição)",
      inputs: [
        {
          name: 'title_alert',
          value: title_alert          
        },        
        {
          name: 'last_description',
          value: last_description          
        }        
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.alerts.update(alertId, {
              title_alert: data.title_alert,              
              last_description: data.last_description              
            });
          }
        }
      ]
    });
    prompt.present();
  }

  updateType(alertId, type_alert){
    let prompt = this.alertCtrl.create({
      message: "Editar tipo de Alerta: ",
      inputs: [        
        {
          label: "Grave (Vermelho)",
          value: '1',
          type: 'radio'                   
        },
        {
          label: "Médio (Amarelo)",
          value: '2',
          type: 'radio'         
        },
        {
          label: "Leve (Verde)",
          value: '3',
          type: 'radio'         
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.alerts.update(alertId, {              
              type_alert: data
            });
          }
        }
      ]
    });
    prompt.present();
  }

  showOptions(alertId, title_alert, type_alert, date_alert, last_description, url_photo, local_alert) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Escolha a opção:',
      buttons: [
        {
          text: 'Editar Alerta',
          handler: () => {
            this.updateAlert(alertId, title_alert, type_alert, last_description);
          }
        },
        {
          text: 'Mudar Tipo Alerta',
          handler: () => {
            this.updateType(alertId, type_alert);
          }
        },
        {
          text: 'Aprovar Alerta',
          handler: () => {
            this.ap.aproveAlert(alertId, title_alert, type_alert, date_alert, last_description, url_photo, local_alert);
            this.removeAlert(alertId);
          }
        },        
        {
          text: 'Deletar Alerta',
          role: 'destructive',
          handler: () => {
            this.removeAlert(alertId);
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  goToFotoDoAlerta(params) {
    if (!params) params = {};
    this.navCtrl.push(FotoDoAlertaPage, {
      key: params
    });
  }
  goToMapa(params) {
    if (!params) params = {};
    this.navCtrl.push(MapaPage, {
      key: params
    });
  }

}

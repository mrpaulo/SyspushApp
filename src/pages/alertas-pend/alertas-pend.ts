import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, ActionSheetController } from 'ionic-angular';
import { AcessarProvider } from "../../providers/acessar/acessar";
import { FirebaseListObservable } from "angularfire2/database";

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
    console.log("Lista: " + this.alerts)   
  }  

  ionViewDidLoad() {
    console.log('ionViewDidLoad AlertasPendPage');
  }
  removeAlert(alertId: string){
    this.alerts.remove(alertId);
  }

  updateAlert(alertId, title_alert, type_alert, last_description){
    let prompt = this.alertCtrl.create({
      message: "Editar Alerta",
      inputs: [
        {
          name: 'title_alert',
          value: title_alert          
        },
        {          
          name: 'type_alert',
          value: type_alert          
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
              type_alert: data.type_alert,
              last_description: data.last_description              
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

}

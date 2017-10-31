import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, ActionSheetController } from 'ionic-angular';
import { AcessarProvider } from "../../providers/acessar/acessar";
//import { FirebaseListObservable } from "angularfire2/database";

@IonicPage()
@Component({
  selector: 'page-editar-alertas',
  templateUrl: 'editar-alertas.html',
  providers: [
    AcessarProvider
  ]
})

export class EditarAlertasPage {
  dataString: string;
  url_img: any;
  public alerts: any;

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public ap: AcessarProvider,
    public actionSheetCtrl: ActionSheetController
  ) {
    this.alerts = ap.listarAlertas();    
  }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad AlertasPendPage');
  // }
  removeAlert(alertId: string) {
    let prompt = this.alertCtrl.create({
      title: "Você tem certeza que deseja apagar este Alerta?",
      buttons: [
        {
          text: 'Não',
          handler: data => {
            console.log('Não clicked');
          }
        },
        {
          text: 'Sim',
          handler: data => {
            this.alerts.remove(alertId);
          }
        }
      ]
    });
    prompt.present();
  }

  updateAlert(alertId, title_alert, last_description) {
    let prompt = this.alertCtrl.create({
      message: "Editar Alerta",
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

  addDescAlert(alertId, last_description, penultimate_description, antepenultimate_description) {
    let prompt = this.alertCtrl.create({
      title: "Adicionar descrição recente: ",
      message: "Ultima foi: "+last_description,
      inputs: [        
        {
          name: 'last_description',
          placeholder: 'Descreva a mais recente...'
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
            antepenultimate_description = penultimate_description;
            penultimate_description = last_description;            
            let dataAgora = new Date();
            this.dataString = dataAgora.toString();
            this.alerts.update(alertId, {
              date_alert: this.dataString,
              last_description: data.last_description,
              penultimate_description: penultimate_description,
              antepenultimate_description: antepenultimate_description
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
            if (data == "1") { this.url_img = "img/thumbnailVermelho.jpg"; } if (data == "2") { this.url_img = "img/thumbnailAmarelo.jpg"; } if (data == "3") { this.url_img = "img/thumbnailVerde.jpg"; };
            this.alerts.update(alertId, {              
              type_alert: data,
              url_img: this.url_img
            });
          }
        }
      ]
    });
    prompt.present();
  }

  showOptions(alertId, title_alert, type_alert, date_alert, last_description, url_photo, local_alert, penultimate_description, antepenultimate_description) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Escolha a opção:',
      buttons: [
        {
          text: 'Editar Alerta',
          handler: () => {
            this.updateAlert(alertId, title_alert, last_description);
          }
        },
        {
          text: 'Mudar Tipo Alerta',
          handler: () => {
            this.updateType(alertId, type_alert);
          }
        },
        {
          text: 'Adicionar Descrição Recente',
          handler: () => {
            this.addDescAlert(alertId, last_description, penultimate_description, antepenultimate_description);
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
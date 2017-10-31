import { IonicPage, NavController, AlertController, ActionSheetController } from 'ionic-angular';
import { Component } from '@angular/core';
import { AcessarProvider } from "../../providers/acessar/acessar";
//import { FirebaseListObservable } from "angularfire2/database";

@IonicPage()
@Component({
  selector: 'page-user-lista',
  templateUrl: 'user-lista.html',
  providers: [
    AcessarProvider
  ]
})
export class UserListaPage {
users:  any;

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController, 
    public ap: AcessarProvider, 
    public actionSheetCtrl: ActionSheetController    
  ) {
    this.users = ap.listarUser();       
  }
  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad UserListaPage');
  // }

  removeUser(userId: string){
    this.users.remove(userId);
  }

  updateType(userId, name, type_user){
    let prompt = this.alertCtrl.create({
      message: "Editar tipo do Usuário: "+name,
      inputs: [        
        {
          label: "Cadastrado",
          value: '1',
          type: 'radio'                   
        },
        {
          label: "Operador",
          value: '2',
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
            if(data=='2'){var value = true}else{value = false}
            this.users.update(userId, {              
              type_user: data,
              oper: value
            });
          }
        }
      ]
    });
    prompt.present();
  }

  updateUser(userId, name, email, cellphone){
    let prompt = this.alertCtrl.create({
      message: "Editar dados do Usuário: "+name,
      inputs: [
        {          
          name: 'name',
          value: name          
        },
        {          
          name: 'email',
          value: email          
        },
        {
          name: 'cellphone',
          value: cellphone          
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
            this.users.update(userId, {
              name: data.name,
              email: data.email,
              cellphone: data.cellphone
            });
          }
        }
      ]
    });
    prompt.present();
  }

  showOptions(userId, name, email, cellphone, type_user) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Escolha a opção:',
      buttons: [
        {
          text: 'Editar Usuário',
          handler: () => {
            this.updateUser(userId, name, email, cellphone);
          }
        },
        {
          text: 'Mudar tipo Usuário',
          handler: () => {
            this.updateType(userId, name, type_user);
          }
        },
        {
          text: 'Deletar Usuário',
          role: 'destructive',
          handler: () => {
            this.removeUser(userId);
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

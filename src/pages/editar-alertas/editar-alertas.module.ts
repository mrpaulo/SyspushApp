import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditarAlertasPage } from './editar-alertas';

@NgModule({
  declarations: [
    EditarAlertasPage,
  ],
  imports: [
    IonicPageModule.forChild(EditarAlertasPage),
  ],
})
export class EditarAlertasPageModule {}

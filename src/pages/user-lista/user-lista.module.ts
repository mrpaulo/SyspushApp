import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserListaPage } from './user-lista';

@NgModule({
  declarations: [
    UserListaPage,
  ],
  imports: [
    IonicPageModule.forChild(UserListaPage),
  ],
})
export class UserListaPageModule {}

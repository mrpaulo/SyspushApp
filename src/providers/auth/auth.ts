import { Injectable } from '@angular/core';
//import { Platform, LoadingController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

import { AcessarProvider } from "../../providers/acessar/acessar";

@Injectable()
export class AuthProvider {
  public user: Observable<firebase.User>;

  constructor(
    // private platform: Platform,
    // private loadingCtrl: LoadingController,
    public afAuth: AngularFireAuth,
    public lp: AcessarProvider,
  ) {
    this.user = afAuth.authState;
  }

  signInWithEmailAndPassword(email: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(email, password).then((data) => {
        resolve(data);
      }, (error) => {
        reject(error);
      });
    });
  }

  sendPasswordResetEmail(email: string): Promise<any> {
    return new Promise((resolve, reject) => {
      firebase.auth().sendPasswordResetEmail(email).then((data) => {
        resolve(data);
      }, (error) => {
        reject(error);
      });
    });
  }

  logout(): Promise<any> {
    return new Promise((resolve, reject) => {
      firebase.auth().signOut().then(() => {
        resolve();
      }, (error) => {
        reject(error);
      });
    });
  }
}


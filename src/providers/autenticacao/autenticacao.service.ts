import * as firebase from 'firebase/app';
import 'rxjs/add/operator/first';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';


@Injectable()
export class AutenticacaoService {

  constructor(public fire: AngularFireAuth) {

  }

  createAuthUser(user: { email: string, password: string }) {
    return this.fire.auth.createUserWithEmailAndPassword(user.email, user.password);
    //  .catch(this.handlePromiseError);     
  }

  signinWithEmail(user: { email: string, senha: string }): Promise<boolean> {
    return this.fire.auth.signInWithEmailAndPassword(user.email, user.senha)
      .then((authUser: firebase.auth.UserCredential) => {
        return authUser != null;
      })//.catch(this.handlePromiseError);
  }

  signInWithFacebook() {
    this.fire.auth
      .signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .then(res => console.log(res));
  }


  logout(): Promise<any> {
    return this.fire.auth.signOut();
  }

  get authenticated(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.fire
        .authState
        .first()
        .subscribe((authUser: firebase.User) => {
          (authUser) ? resolve(true) : reject(false);
        });
    });

  }

}

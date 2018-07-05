import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { AutenticacaoService } from '../providers/autenticacao/autenticacao.service';
import { UsuarioService } from '../providers/usuario/usuario.service';
import { Usuario } from '../models/usuario.model';
import { LoginPage } from '../pages/login/login';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;
  currentUser: Usuario;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    autenticacaoService: AutenticacaoService,
    usuarioService: UsuarioService
  ) {

    autenticacaoService
      .fire
      .authState
      .subscribe((authUser: firebase.User) => {

        if (authUser) {

          this.rootPage = HomePage;

          usuarioService.currentUser
            .valueChanges()
            .subscribe((user: Usuario) => {
              this.currentUser = user;
            });

        } else {
          this.rootPage = LoginPage;
        }
      })


    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}


import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { UsuarioService } from '../providers/usuario/usuario.service';
import { AutenticacaoService } from '../providers/autenticacao/autenticacao.service';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { LoginPage } from '../pages/login/login';
import { CadastroLoginPage } from '../pages/cadastro-login/cadastro-login';
import { UserInfoComponent } from '../components/user-info/user-info';
import { UserMenuComponent } from '../components/user-menu/user-menu';
import { CustomLoggedHeaderComponent } from '../components/custom-logged-header/custom-logged-header';
import { ProgressBarComponent } from '../components/progress-bar/progress-bar';
import { UsuarioPerfilPage } from '../pages/usuario-perfil/usuario-perfil';
import { CadastroCategoriaPage } from '../pages/cadastro-categoria/cadastro-categoria';
import { CadastroPrioridadePage } from '../pages/cadastro-prioridade/cadastro-prioridade';
import { CadastroTecnicoPage } from '../pages/cadastro-tecnico/cadastro-tecnico';
import { TecnicoPage } from '../pages/tecnico/tecnico';
import { CategoriaPage } from '../pages/categoria/categoria';
import { PrioridadePage } from '../pages/prioridade/prioridade';
import { PrioridadeService } from '../providers/prioridade/prioridade.service';
import { CategoriaService } from '../providers/categoria/categoria.service';
import { TecnicoService } from '../providers/tecnico/tecnico.service';
import { SubcategoriaService } from '../providers/subcategoria/subcategoria.service';
import { SubcategoriaPage } from '../pages/subcategoria/subcategoria';
import { CadastroSubcategoriaPage } from '../pages/cadastro-subcategoria/cadastro-subcategoria';

export const firebaseConfig = {
  apiKey: "AIzaSyAeV0JLOoieAKV3fkR7R6_xu0at3EgrQls",
  authDomain: "servicedesk-915f3.firebaseapp.com",
  databaseURL: "https://servicedesk-915f3.firebaseio.com",
  projectId: "servicedesk-915f3",
  storageBucket: "servicedesk-915f3.appspot.com",
  messagingSenderId: "694124151284"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    CadastroLoginPage,
    UsuarioPerfilPage,
    UserInfoComponent,
    UserMenuComponent,
    CustomLoggedHeaderComponent,
    ProgressBarComponent,
    CadastroCategoriaPage,
    CadastroPrioridadePage,
    CadastroTecnicoPage,
    TecnicoPage,
    CategoriaPage,
    PrioridadePage,
    SubcategoriaPage,
    CadastroSubcategoriaPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    CadastroLoginPage,
    UsuarioPerfilPage,
    UserInfoComponent,
    UserMenuComponent,
    CustomLoggedHeaderComponent,
    ProgressBarComponent,
    CadastroCategoriaPage,
    CadastroPrioridadePage,
    CadastroTecnicoPage,
    TecnicoPage,
    CategoriaPage,
    PrioridadePage,
    SubcategoriaPage,
    CadastroSubcategoriaPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    UsuarioService,
    AutenticacaoService,
    PrioridadeService,
    CategoriaService,
    TecnicoService,
    SubcategoriaService
  ]
})
export class AppModule { }

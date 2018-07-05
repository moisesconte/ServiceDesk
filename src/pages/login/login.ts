import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, Loading } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AutenticacaoService } from '../../providers/autenticacao/autenticacao.service';
import { HomePage } from '../home/home';
import { CadastroLoginPage } from '../cadastro-login/cadastro-login';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loginForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public autenticacaoService: AutenticacaoService,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController
  ) {
    let emailRegex = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern(emailRegex)])],
      senha: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  cadastrar() {
    this.navCtrl.push(CadastroLoginPage);
  }

  recuperarSenha() {
    // this.navCtrl.push(RecuperarSenhaPage);
  }

  signInWithEmailPassword() {
    let loading: Loading = this.showLoading();

    this.autenticacaoService.signinWithEmail(this.loginForm.value)
      .then((estaLogado: boolean) => {

        if (estaLogado) {
          this.navCtrl.setRoot(HomePage);
          loading.dismiss();
        }
      }).catch((error: any) => {
        console.log(error.code);
        loading.dismiss();
        this.showAlert(error.code);
      })
  }

  private showLoading(): Loading {
    let loading: Loading = this.loadingCtrl.create({
      content: 'Por favor aguarde...'
    });

    loading.present();
    return loading;
  }

  private showAlert(message: string): void {
    let mensagemErro: string;

    if (message == 'auth/invalid-email') {
      mensagemErro = 'Email inválido.';
    } else if (message == 'auth/user-disabled') {
      mensagemErro = 'Esse usuário foi desabilitado.';
    } else if (message == 'auth/user-not-found') {
      mensagemErro = 'Usuário não encontrado.';
    } else if (message == 'auth/wrong-password') {
      mensagemErro = 'Senha invalida.';
    } else if (message == 'auth/network-request-failed') {
      mensagemErro = 'Problemas na conexão com a internet.';
    } else {
      mensagemErro = message;
    }

    this.alertCtrl.create({
      message: mensagemErro,
      buttons: ['ok']
    }).present();
  }


}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, AlertController, Loading } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UsuarioService } from '../../providers/usuario/usuario.service';
import { AutenticacaoService } from '../../providers/autenticacao/autenticacao.service';
import * as firebase from 'firebase/app';
import 'rxjs/add/operator/first';

@IonicPage()
@Component({
  selector: 'page-cadastro-login',
  templateUrl: 'cadastro-login.html',
})
export class CadastroLoginPage {
  cadastroForm: FormGroup;
  usuario: any;
  perfilAlertOpts: { title: string };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public toastCrtl: ToastController,
    public alertCtrl: AlertController,
    public usuarioService: UsuarioService,
    public autenticacaoService: AutenticacaoService
  ) {

    this.usuario = this.navParams.get('usuario') || {};

    console.log(this.usuario);

    this.perfilAlertOpts = {
      title: 'Selecione um perfil',
    }

    let emailRegex = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

    this.cadastroForm = this.formBuilder.group({
      key: [this.usuario.$key],
      nome: [this.usuario.nome || '', [Validators.required]],
      senha: [this.usuario.senha || '', this.usuario.$key? ![Validators.required] : [Validators.required, Validators.minLength(6)] ],
      email: [this.usuario.email || '', this.usuario.$key? ![Validators.required] : [Validators.compose([Validators.required, Validators.pattern(emailRegex)])]],
      perfil: [this.usuario.perfil || '', [Validators.required]],
      situacao: [this.usuario.situacao || false, [Validators.required]]
    });
  }

  ionViewDidLoad() {
  }

  cadastrar() {
    let formUser = this.cadastroForm.value;
    let nome: string = formUser.nome;
    let loading: Loading = this.showLoading();
    let toast = this.toastCrtl.create({ duration: 3000, position: 'botom' });

    console.log(nome);

    // this.usuarioService.userExists(nome)
    //  .first()
    //  .subscribe((usuarioExiste: boolean) => {

    //    if (!usuarioExiste) {

    if (formUser.key) {

      this.usuarioService.update(formUser);
      toast.setMessage('Usuário atualizado com sucesso!');
      toast.present();
      loading.dismiss();
      this.navCtrl.pop();

    } else {

      this.autenticacaoService.createAuthUser({
        email: formUser.email,
        password: formUser.senha
      })
        .then((authState: firebase.auth.UserCredential) => {

          let uuid: string = authState.user.uid;

          this.autenticacaoService.logout();

          delete formUser.senha;

          this.usuarioService.create(formUser, uuid)
            .then(() => {

              console.log('Usuário cadastrado');
              loading.dismiss();

              toast.setMessage('Usuário criado com sucesso!');
              toast.present();


            }).catch((error: any) => {
              this.showAlert(error);
            });

        }).catch((error: any) => {
          console.log(error.code);
          loading.dismiss();
          this.showAlert(error.code);
        });

      // } else {
      //   this.showAlert(`O nome ${nome} já esta sendo usado em outra conta.`);
      //  loading.dismiss();
      // }
      // });

    }


  }

  private showLoading(): Loading {
    let loading: Loading = this.loadingCtrl.create({
      content: 'Aguarde...'
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
      mensagemErro = 'Senha errada.';
    } else if (message == 'auth/network-request-failed') {
      mensagemErro = 'Problemas na conexão com a internet.';
    } else if (message == 'auth/email-already-in-use') {
      mensagemErro = 'Email já esta em uso.';
    } else {
      mensagemErro = message;
    }

    this.alertCtrl.create({
      message: mensagemErro,
      buttons: ['ok']
    }).present();
  }

}

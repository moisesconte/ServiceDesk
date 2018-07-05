import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { PrioridadeService } from '../../providers/prioridade/prioridade.service';


@IonicPage()
@Component({
  selector: 'page-cadastro-prioridade',
  templateUrl: 'cadastro-prioridade.html',
})
export class CadastroPrioridadePage {
  form: FormGroup;
  prioridade: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public prioridadeService: PrioridadeService

  ) {

    this.prioridade = this.navParams.get('prioridade') || {};
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      key: [this.prioridade.$key],
      nome: [this.prioridade.nome, Validators.required],
      descricao: [this.prioridade.descricao]
    });
  }

  gravar() {
    if (this.form.valid) {
      let form = this.form.value;

      if (form.key) {
        //update
        this.prioridadeService.update(this.form.value);
        this.toastCtrl.create({ message: 'Prioridade salva com sucesso.', duration: 3000 }).present();
        this.navCtrl.pop();

      } else {
        this.prioridadeService.save(this.form.value);
        this.toastCtrl.create({ message: 'Prioridade salva com sucesso.', duration: 3000 }).present();
        this.navCtrl.pop();
      }
    }

  }

}

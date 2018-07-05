import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, ToastController, AlertController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoriaService } from '../../providers/categoria/categoria.service';


@IonicPage()
@Component({
  selector: 'page-cadastro-categoria',
  templateUrl: 'cadastro-categoria.html',
})
export class CadastroCategoriaPage {
  //cadastroForm: FormGroup;
  form: FormGroup;
  categoria: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public categoriaSerivce: CategoriaService
  ) {
    // this.cadastroForm = this.formBuilder.group({
    //   nome: ['', [Validators.required]],
    //   descricao: ['']
    // });

    this.categoria = this.navParams.get('categoria') || {};
    this.createForm();

  }

  createForm() {
    this.form = this.formBuilder.group({
      key: [this.categoria.$key],
      nome: [this.categoria.nome, Validators.required],
      descricao: [this.categoria.descricao]
    });
  }

  gravar() {
    if (this.form.valid) {
      let form = this.form.value;

      if (form.key) {
        //update
        this.categoriaSerivce.update(this.form.value);
        this.toastCtrl.create({ message: 'Categoria salva com sucesso.', duration: 3000 }).present();
        this.navCtrl.pop();

      } else {
        this.categoriaSerivce.save(this.form.value);
        this.toastCtrl.create({ message: 'Categoria salva com sucesso.', duration: 3000 }).present();
        this.navCtrl.pop();
      }
    }

  }
}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoriaService } from '../../providers/categoria/categoria.service';
import { Categoria } from '../../models/categoria.model';
import { PrioridadeService } from '../../providers/prioridade/prioridade.service';
import { Prioridade } from '../../models/prioridade.model';
import { SubcategoriaService } from '../../providers/subcategoria/subcategoria.service';


@IonicPage()
@Component({
  selector: 'page-cadastro-subcategoria',
  templateUrl: 'cadastro-subcategoria.html',
})
export class CadastroSubcategoriaPage {
  categorias: Categoria[];
  prioridades: Prioridade[];
  categoria: any;
  prioridade: any;
  subcategoria: any;
  form: FormGroup;

  categoriaAlertOpts: { title: string, subTitle: string };
  prioridadeAlertOpts: { title: string };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public subcategoriaService: SubcategoriaService,
    public categoriaService: CategoriaService,
    public prioridadeService: PrioridadeService
  ) {

    this.subcategoria = this.navParams.get('subcategoria') || {};
    this.createForm();

    this.categoriaAlertOpts = {
      title: 'Selecione uma categoria',
      subTitle: ''
    }

    this.prioridadeAlertOpts = {
      title: 'Selecione uma categoria'
    }

    this.categoriaService.getAll()
      .subscribe((categorias: Categoria[]) => {
        this.categorias = categorias;
      });

    this.prioridadeService.getAll()
      .subscribe((prioridades: Prioridade[]) => {
        this.prioridades = prioridades;
      });
  }

  createForm() {
    this.form = this.formBuilder.group({
      key: [this.subcategoria.$key],
      subcategoria: [this.subcategoria.subcategoria || '', [Validators.required]],
      categoria_key: [this.subcategoria.categoria_key || '', [Validators.required]],
      prioridade_key: [this.subcategoria.prioridade_key || '', [Validators.required]],
      descricao: [this.subcategoria.descricao]
    });
  }


  categoriaSelecionada(categoria) {
    console.log('categoria ', categoria);
  }

  prioridadeSelecionada(prioriade) {
    console.log('prioriade ', prioriade);
  }

  gravarSubcategoria() {
    if (this.form.valid) {
      let form = this.form.value;

      if (form.key) {
        //update
        this.subcategoriaService.update(this.form.value);
        this.toastCtrl.create({ message: 'Subcategoria salva com sucesso.', duration: 3000 }).present();
        this.navCtrl.pop();

      } else {
        this.subcategoriaService.save(this.form.value);
        this.toastCtrl.create({ message: 'Subcategoria salva com sucesso.', duration: 3000 }).present();
        this.navCtrl.pop();
      }
    }
  }

}

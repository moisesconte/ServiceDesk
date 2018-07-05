import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { CadastroCategoriaPage } from '../cadastro-categoria/cadastro-categoria';
import { CategoriaService } from '../../providers/categoria/categoria.service';
import { Categoria } from '../../models/categoria.model';


@IonicPage()
@Component({
  selector: 'page-categoria',
  templateUrl: 'categoria.html',
})
export class CategoriaPage {
  categorias: Categoria[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public categoriaService: CategoriaService,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
  ) {

    this.categoriaService.getAll()
      .subscribe((categorias: Categoria[]) => {
        this.categorias = categorias;
        console.log(categorias);
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoriaPage');
  }

  novaCategoria() {
    this.navCtrl.push(CadastroCategoriaPage);
  }

  editarCategoria(categoria) {
    this.navCtrl.push(CadastroCategoriaPage, {
      categoria: categoria
    });
  }

  excluir(categoria) {

    this.alertCtrl.create({
      message: `Deseja excluir a categoria "${categoria.nome}"?`,
      buttons: [
        {
          text: 'Sim',
          handler: () => {
            this.categoriaService.excluir(categoria)
              .then((value: any) => {
                console.log(value);
                this.toastCtrl.create({ message: 'Categoria exluída com sucesso.', duration: 3000 }).present();
              });
          }
        },
        {
          text: 'Não'
        }
      ]
    }).present();

  }

}

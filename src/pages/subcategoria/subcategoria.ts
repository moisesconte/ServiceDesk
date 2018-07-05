import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CadastroSubcategoriaPage } from '../cadastro-subcategoria/cadastro-subcategoria';
import { Subcategoria } from '../../models/subcategoria.model';
import { SubcategoriaService } from '../../providers/subcategoria/subcategoria.service';


@IonicPage()
@Component({
  selector: 'page-subcategoria',
  templateUrl: 'subcategoria.html',
})
export class SubcategoriaPage {
  subcategorias: Subcategoria[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public subcategoriaService: SubcategoriaService
  ) {

    this.subcategoriaService.getAll()
      .subscribe((subcategorias: Subcategoria[]) => {
        this.subcategorias = subcategorias;
        console.log(subcategorias);
      });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SubcategoriaPage');
  }

  novaSubcategoria() {
    this.navCtrl.push(CadastroSubcategoriaPage);
  }

  editarSubcategoria(subcategoria) {
    this.navCtrl.push(CadastroSubcategoriaPage, {
      subcategoria: subcategoria
    });
  }

}

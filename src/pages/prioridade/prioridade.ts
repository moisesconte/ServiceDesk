import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CadastroPrioridadePage } from '../cadastro-prioridade/cadastro-prioridade';
import { Prioridade } from '../../models/prioridade.model';
import { PrioridadeService } from '../../providers/prioridade/prioridade.service';


@IonicPage()
@Component({
  selector: 'page-prioridade',
  templateUrl: 'prioridade.html',
})
export class PrioridadePage {
  prioridades: Prioridade[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public prioridadeService: PrioridadeService
  ) {

    this.prioridadeService.getAll()
      .subscribe((prioridades: Prioridade[]) => {
        this.prioridades = prioridades;
        console.log(prioridades);
      });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PrioridadePage');
  }

  novaPrioridade() {
    this.navCtrl.push(CadastroPrioridadePage);
  }

  editarPrioridade(prioridade) {
    this.navCtrl.push(CadastroPrioridadePage, {
      prioridade: prioridade
    });
  }

}

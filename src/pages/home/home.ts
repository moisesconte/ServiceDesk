import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { AutenticacaoService } from '../../providers/autenticacao/autenticacao.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public autenticacaoService: AutenticacaoService
  ) {

  }

  ionViewCanEnter(): Promise<boolean> {
    return this.autenticacaoService.authenticated;
  }

  ionViewDidLoad() {
    this.menuCtrl.enable(true, 'menu');
  }

}

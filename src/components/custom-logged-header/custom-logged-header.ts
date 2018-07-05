import { AlertController, App, MenuController } from 'ionic-angular';
import { Component, Input } from '@angular/core';
import { BaseComponent } from '../base.component';
import { Usuario } from '../../models/usuario.model';
import { AutenticacaoService } from '../../providers/autenticacao/autenticacao.service';


@Component({
  selector: 'custom-logged-header',
  templateUrl: 'custom-logged-header.html'
})
export class CustomLoggedHeaderComponent extends BaseComponent {
  @Input() title: string;
  @Input() user: Usuario;

  constructor(
    public alertCtrl: AlertController,
    public authService: AutenticacaoService,
    public app: App,
    public menuCtrl: MenuController
  ) {
    super(alertCtrl, authService, app, menuCtrl);
  }

}

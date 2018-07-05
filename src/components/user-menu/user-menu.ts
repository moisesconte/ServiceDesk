import { AlertController, App, MenuController } from 'ionic-angular';
import { Component, Input } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { AutenticacaoService } from '../../providers/autenticacao/autenticacao.service';
import { BaseComponent } from '../base.component';
import { HomePage } from '../../pages/home/home';
import { UsuarioPerfilPage } from '../../pages/usuario-perfil/usuario-perfil';
import { CategoriaPage } from '../../pages/categoria/categoria';
import { PrioridadePage } from '../../pages/prioridade/prioridade';
import { TecnicoPage } from '../../pages/tecnico/tecnico';
import { SubcategoriaPage } from '../../pages/subcategoria/subcategoria';


@Component({
  selector: 'user-menu',
  templateUrl: 'user-menu.html'
})
export class UserMenuComponent extends BaseComponent {
  @Input('user') currentUser: Usuario;
  pages: Array<{ title: string, component: any }>;

  constructor(
    public alertCtrl: AlertController,
    public authService: AutenticacaoService,
    public app: App,
    public menuCtrl: MenuController
  ) {
    super(alertCtrl, authService, app, menuCtrl);

    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Cadastro de Categorias', component: CategoriaPage },
      { title: 'Cadastro de Subcategorias', component: SubcategoriaPage },
      { title: 'Cadastro de Prioridades', component: PrioridadePage },
      { title: 'Cadastro de Técnicos e Usuários', component: TecnicoPage },

    ]
  }

  onProfile(): void {
    this.navCtrl.push(UsuarioPerfilPage);
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.navCtrl.setRoot(page.component);
  }

}

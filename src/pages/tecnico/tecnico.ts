import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsuarioService } from '../../providers/usuario/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { AngularFireList } from 'angularfire2/database';
import { first } from 'rxjs/operators';
import { CadastroLoginPage } from '../cadastro-login/cadastro-login';
//moisesconte

@IonicPage()
@Component({
  selector: 'page-tecnico',
  templateUrl: 'tecnico.html',
})
export class TecnicoPage {
  usuarios: Usuario[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public usuarioService: UsuarioService
  ) {

    this.usuarioService.getAll()
      .subscribe((usuarios: Usuario[]) => {
        this.usuarios = usuarios;
      })

    /* this.usuarios
       .valueChanges().pipe(
         first()
       ).subscribe((usuarios: Usuario[]) =>{})*/
  }

  novaUsuario() {
    this.navCtrl.push(CadastroLoginPage);
  }

  editarUsuario(usuario) {
    this.navCtrl.push(CadastroLoginPage, {
      usuario: usuario
    });
  }

}

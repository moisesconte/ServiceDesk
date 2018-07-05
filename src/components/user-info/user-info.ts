import { Component, Input } from '@angular/core';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'user-info',
  templateUrl: 'user-info.html'
})
export class UserInfoComponent {

  @Input() user: Usuario;
  @Input() isMenu: boolean = false;

  constructor() {
  }

}

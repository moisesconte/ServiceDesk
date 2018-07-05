import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadastroTecnicoPage } from './cadastro-tecnico';

@NgModule({
  declarations: [
    CadastroTecnicoPage,
  ],
  imports: [
    IonicPageModule.forChild(CadastroTecnicoPage),
  ],
})
export class CadastroTecnicoPageModule {}

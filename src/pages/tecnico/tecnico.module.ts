import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TecnicoPage } from './tecnico';

@NgModule({
  declarations: [
    TecnicoPage,
  ],
  imports: [
    IonicPageModule.forChild(TecnicoPage),
  ],
})
export class TecnicoPageModule {}

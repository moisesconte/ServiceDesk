import 'firebase/storage'
import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseApp } from 'angularfire2';
import { map } from 'rxjs/operators';
import { Prioridade } from '../../models/prioridade.model';


@Injectable()
export class PrioridadeService extends BaseService {

  constructor(
    private db: AngularFireDatabase,
    public firebaseApp: FirebaseApp,
  ) {
    super();
  }

  getAll() {
    return this.db.list<Prioridade>('/prioridades').snapshotChanges().pipe(
      map(actions => actions.map(actions => ({ $key: actions.key, ...actions.payload.val() })))
    )
  }

  create(prioridade: Prioridade) {
    return this.db.object(`/prioridades/${prioridade.$key}`)
      .set(prioridade);
  }

  save(prioridade: any) {
    return this.db.database.ref().child('prioridades').push(prioridade).key;
  }

  update(prioridade: any) {
    this.db.database.ref().child(`prioridades/${prioridade.key}`).update(prioridade);
  }

  excluir(prioridade) {
    return this.db.database.ref().child(`prioridades/${prioridade.$key}`)
      .remove()
      .then(() => {
        //
      });
  }
}
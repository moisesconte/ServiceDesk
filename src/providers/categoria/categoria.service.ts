import * as firebase from 'firebase/app';
import 'firebase/storage'
import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseApp } from 'angularfire2';
import { Categoria } from '../../models/categoria.model';
import { map } from 'rxjs/operators';


@Injectable()
export class CategoriaService extends BaseService {

  constructor(
    private db: AngularFireDatabase,
    public firebaseApp: FirebaseApp,
  ) {
    super();
  }

  getAll() {
    return this.db.list<Categoria>('/categorias').snapshotChanges().pipe(
      map(actions => actions.map(actions => ({ $key: actions.key, ...actions.payload.val() })))
    )
  }

  create(categoria: Categoria) {
    return this.db.object(`/categorias/${categoria.$key}`)
      .set(categoria);
  }

  save(categoria: any) {
    return this.db.database.ref().child('categorias').push(categoria).key;
  }

  update(categoria: any) {
    this.db.database.ref().child(`categorias/${categoria.key}`).update(categoria);
  }

  excluir(categoria) {
    return this.db.database.ref().child(`categorias/${categoria.$key}`)
      .remove()
      .then(() => {
        //
      });
  }
}

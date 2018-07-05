import 'firebase/storage'
import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseApp } from 'angularfire2';
import { map } from 'rxjs/operators';
import { Subcategoria } from '../../models/subcategoria.model';


@Injectable()
export class SubcategoriaService extends BaseService {

  constructor(private db: AngularFireDatabase,
    public firebaseApp: FirebaseApp,
  ) {
    super();
  }

  getAll() {
    return this.db.list<Subcategoria>('/subcategorias').snapshotChanges().pipe(
      map(actions => actions.map(actions => ({ $key: actions.key, ...actions.payload.val() })))
    )
  }

  create(subcategoria: Subcategoria) {
    return this.db.object(`/subcategorias/${subcategoria.$key}`)
      .set(subcategoria);
  }

  save(subcategoria: any) {
    return this.db.database.ref().child('subcategorias').push(subcategoria).key;
  }

  update(subcategoria: any) {
    this.db.database.ref().child(`subcategorias/${subcategoria.key}`).update(subcategoria);
  }

  excluir(subcategoria) {
    return this.db.database.ref().child(`subcategorias/${subcategoria.$key}`)
      .remove()
      .then(() => {
        //
      });
  }
}
import { Injectable } from '@angular/core';
import { AngularFireObject, AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { Usuario } from '../../models/usuario.model';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseApp } from 'angularfire2';
import { BaseService } from '../base.service';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';


@Injectable()
export class UsuarioService extends BaseService {
  currentUser: AngularFireObject<Usuario>;
  users: Observable<Usuario[]>;

  constructor(
    public db: AngularFireDatabase,
    public afAuth: AngularFireAuth,
    public firebaseApp: FirebaseApp,
  ) {
    super();
    this.listenAuthState();
  }

  private setUsers(uidToExclude: string): void {
    this.users = this.mapListKeys<Usuario>(
      this.db.list<Usuario>(`/usuarios`,
        (ref: firebase.database.Reference) => ref.orderByChild('nome')
      )
    ).pipe(
      map((users: Usuario[]) => {
        return users.filter((user: Usuario) => user.$key !== uidToExclude);
      })
    );
    // .map((users: Usuario[]) => {
    //  return users.filter((user: Usuario) => user.$key !== uidToExclude);
    // });
  }

  private listenAuthState(): void {
    this.afAuth
      .authState
      .subscribe((authUser: firebase.User) => {
        if (authUser) {
          console.log('Auth state alterado!', authUser.uid);
          this.currentUser = this.db.object(`/usuarios/${authUser.uid}`);
          this.setUsers(authUser.uid);
        }
      });
  }

  create(user: Usuario, uuid: string): Promise<void> {
    return this.db.object(`/usuarios/${uuid}`)
      .set(user)
      .catch(this.handlePromiseError);
  }

  edit(user: { nome: string, foto?: string, perfil?: string, situacao?: boolean, $key?: string }): Promise<void> {
    return this.db.object(`/usuarios/${user.$key}`)
      .update(user)
      .catch(this.handlePromiseError);
  }

  update(usuario: any) {
    this.db.database.ref().child(`usuarios/${usuario.key}`).update(usuario);
  }

  userExists(nome: string): Observable<boolean> {
    return this.db.list(`/usuarios`, ref => ref.orderByChild('nome').equalTo(nome))

      // return this.db.list(`/usuarios`,
      //   (ref: firebase.database.Reference) => ref.orderByChild('nome').equalTo(nome)
      //  )
      .valueChanges().pipe(
        map((users: Usuario[]) => {
          return users.length > 0;
        })
      );
    //  .map((users: Usuario[]) => {
    //    return users.length > 0;
    //  });
    //.catch(this.handleObservableError);
  }

  get(userId: string): AngularFireObject<Usuario> {
    return this.db.object<Usuario>(`/usuarios/${userId}`);
  }

  /*getAll(): AngularFireList<Usuario[]> {
    return this.db.list(`/usuarios`,
      (ref: firebase.database.Reference) => ref.orderByChild('nome'));
  }*/

  getAll() {
    return this.db.list<Usuario>('/usuarios',
      (ref: firebase.database.Reference) => ref.orderByChild('nome')).snapshotChanges().pipe(
        map(actions => actions.map(actions => ({ $key: actions.key, ...actions.payload.val() })))
      )
  }

  uploadPhoto(file: File, userId: string): firebase.storage.UploadTask {
    return this.firebaseApp
      .storage()
      .ref()
      .child(`/usuarios/${userId}`)
      .put(file);
  }

}

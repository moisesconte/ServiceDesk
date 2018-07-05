import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AutenticacaoService } from '../../providers/autenticacao/autenticacao.service';
import { UsuarioService } from '../../providers/usuario/usuario.service';
import { Usuario } from '../../models/usuario.model';


@IonicPage()
@Component({
  selector: 'page-usuario-perfil',
  templateUrl: 'usuario-perfil.html',
})
export class UsuarioPerfilPage {
  currentUser: Usuario;
  canEdit: boolean = false;
  uploadProgress: number;
  private filePhoto: File;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public authService: AutenticacaoService,
    public userService: UsuarioService
  ) {
  }

  ionViewCanEnter(): Promise<boolean> {
    return this.authService.authenticated;
  }

  ionViewDidLoad() {
    this.userService
      .mapObjectKey(this.userService.currentUser)
      .subscribe((user: Usuario) => {
        console.log('key - usuario: ', user);
        this.currentUser = user;
      });
  }

  onSubmit(event: Event): void {
    event.preventDefault();

    if (this.filePhoto) {

      let uploadTask = this.userService.uploadPhoto(this.filePhoto, this.currentUser.$key);

      uploadTask.on('state_changed', (snapshot: firebase.storage.UploadTaskSnapshot) => {

        this.uploadProgress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);

      }, (error: Error) => {
        // catch error
      }, () => {

        uploadTask.snapshot.ref.getDownloadURL().then((dowloadURL: any) => {
          this.editUser(dowloadURL);
        });

      });

    } else {
      this.editUser();
    }

  }

  onPhoto(event): void {
    this.filePhoto = event.target.files[0];
  }

  private editUser(photoUrl?: string): void {
    console.log('photoUrl - ', photoUrl);
    this.userService
      .edit({
        nome: this.currentUser.nome,
        //username: this.currentUser.username,
        foto: photoUrl || this.currentUser.foto || ''
      }).then(() => {
        this.canEdit = false;
        this.filePhoto = undefined;
        this.uploadProgress = 0;
      });
  }

}

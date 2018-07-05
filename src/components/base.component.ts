import { OnInit } from "@angular/core";

import { App, AlertController, MenuController, NavController } from 'ionic-angular';
import { LoginPage } from "../pages/login/login";
import { AutenticacaoService } from "../providers/autenticacao/autenticacao.service";

export abstract class BaseComponent implements OnInit {

    protected navCtrl: NavController;

    constructor(
        public alertCtrl: AlertController,
        public authService: AutenticacaoService,
        public app: App,
        public menuCtrl: MenuController
    ) { }

    ngOnInit(): void {
        this.navCtrl = this.app.getActiveNavs()[0];
    }

    onLogout(): void {
        this.alertCtrl.create({
            message: 'Deseja sair do app?',
            buttons: [
                {
                    text: 'Sim',
                    handler: () => {
                        this.authService.logout()
                            .then(() => {
                                this.navCtrl.setRoot(LoginPage);
                                this.menuCtrl.enable(false, 'user-menu');
                            });
                    }
                },
                {
                    text: 'Não'
                }
            ]
        }).present();
    }

}
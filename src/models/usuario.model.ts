export class Usuario {
    public $key: string;

    constructor(
        public nome: string,
        public email: string,
        public senha: string,
        public perfil: string,
        public foto: string,
        public situacao: boolean
    ){}
}
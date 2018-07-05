export class Subcategoria {
    public $key: string;

    constructor(
        public subcategoria: string,
        public categoria_key: string,
        public prioridade_key: string,
        public descricao: string
    ){}
}
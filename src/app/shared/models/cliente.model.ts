import { Endereco } from "./endereco";
import { Usuario } from "./usuario.model";

export class Cliente extends Usuario {

    public cpf: string = '';
    public telefone: string = '';
    
    public endereco?: any;
    
    constructor(
        id: number,
        nome: string,
        email: string,
        senha: string,
        perfil: string,
        ativo: boolean,
        cpf: string,
        telefone: string,
        endereco: any
    ) {
        super(id, nome, email, senha, perfil, ativo);
        this.cpf = cpf;
        this.telefone = telefone;
        this.endereco = endereco;
    }
    /* 
    public id?: number; 
    public cpf: string = ''; // garante unicidade do cliente
    public nome: string = '';
    public email: string = '';
    public cep: string = ''; 
    public telefone: string = ''; 
    public senha: string = '';
    public endereco: any = '';
    public rota: string = ''; 
    public ativo: boolean = true
    */
}

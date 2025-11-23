import { Endereco } from "./endereco";

export class Cliente {
    public id?: number; 
    public cpf: string = ''; // garante unicidade do cliente
    public nome: string = '';
    public email: string = '';
    public cep: string = ''; 
    public telefone: string = ''; 
    public senha: string = '';
    public endereco: any = '';
    public rota: string = ''; 
}

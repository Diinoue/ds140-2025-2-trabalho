export class Usuario {
    constructor(
    public id?: number,
    public nome: string = "",
    public email: string = "", 
    public senha: string = "",
    public perfil: string = "",  // equivale a rota
    public ativo: boolean = true
    ) {}
}

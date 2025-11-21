/*
 Armazena os dados da tela de login,
digitado pelo usuário, login/senha

Trafega para o back-end para verificar se
o usuário pode ser autenticado com sucesso
*/

export class Login {
    constructor(
       public email: string = "",
       public senha: string = "" 
    ) {}
}

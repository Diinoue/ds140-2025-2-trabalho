import { Injectable } from '@angular/core';
import { Cliente } from '../shared/models/cliente.model';

const LS_CHAVE = "clientes";

@Injectable({
  providedIn: 'root'
})
export class Clienteservice {
  
  listarTodos(): Cliente[] {
    const clientes = localStorage[LS_CHAVE];
    return clientes ? JSON.parse(clientes) : [];
  }

  inserir(cliente: Cliente) : void {
    const clientes = this.listarTodos();
    clientes.push(cliente);
    localStorage[LS_CHAVE] = JSON.stringify(clientes);
  }

  buscarPorId(cpf: string) : Cliente | undefined {
    const clientes = this.listarTodos();
    return clientes.find(cliente => cliente.cpf === cpf)
  }

  atualizar(cliente: Cliente) : void { 
    const clientes = this.listarTodos();
    clientes.forEach( (obj, index, objs) => {
      if(cliente.cpf === obj.cpf)
        objs[index] = cliente;
    });

    localStorage [LS_CHAVE] = JSON.stringify(clientes);
  }
  
  remover(cpf: string) : void {
    let clientes = this.listarTodos();
    clientes = clientes.filter(Cliente => Cliente.cpf !== cpf);
    localStorage[LS_CHAVE] = JSON.stringify(clientes);
  }

  salvarLogin(email: string, senha: string) : boolean {
    const clientes = this.listarTodos();
    let teste: boolean = false;
    clientes.forEach( (obj, index, objs) => {
      if(email === obj.email && senha === obj.senha){
        localStorage["login"] = obj.cpf;  
        teste = true;
      }
    });
    return teste;
  }

  getLogin() : any {
    const login = localStorage["login"];
    return login;
  }

}

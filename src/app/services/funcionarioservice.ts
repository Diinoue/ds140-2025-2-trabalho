import { Injectable } from '@angular/core';
import { Funcionario } from '../shared/models/funcionario.model';

const LS_CHAVE = "funcionarios";

@Injectable({
  providedIn: 'root'
})
export class Funcionarioservice {


    listarTodos(): Funcionario[] {
      const Funcionarios = localStorage[LS_CHAVE];
      return Funcionarios ? JSON.parse(Funcionarios) : [];
    }
  
    inserir(funcionario: Funcionario) : void {
      const Funcionarios = this.listarTodos();
      funcionario.id = new Date().getTime();
      Funcionarios.push(funcionario);
      localStorage[LS_CHAVE] = JSON.stringify(Funcionarios);
      console.log(`ID: ${funcionario.id} Email: ${funcionario.email} Nome: ${funcionario.nome} DataNasc: ${funcionario.dataNasc} Senha: ${funcionario.senha})}`)
    }
  
    buscarPorId(id:number) : Funcionario | undefined {
      const Funcionarios = this.listarTodos();
      return Funcionarios.find(funcionario => funcionario.id === id)
    }
  
    atualizar(funcionario: Funcionario) : void { 
      const Funcionarios = this.listarTodos();
      Funcionarios.forEach( (obj, index, objs) => {
        if(funcionario.id === obj.id)
          objs[index] = funcionario;
      });
  
      localStorage [LS_CHAVE] = JSON.stringify(Funcionarios);
    }
    
    remover(id: number) : void {
      let Funcionarios = this.listarTodos();
      Funcionarios = Funcionarios.filter(Funcionario => Funcionario.id !== id);
      localStorage[LS_CHAVE] = JSON.stringify(Funcionarios);
    }
  
}

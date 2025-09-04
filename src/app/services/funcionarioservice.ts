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
      Funcionarios.push(funcionario);
      localStorage[LS_CHAVE] = JSON.stringify(Funcionarios);
    }
  
    buscarPorId(cpf: string) : Funcionario | undefined {
      const Funcionarios = this.listarTodos();
      return Funcionarios.find(funcionario => funcionario.cpf === cpf)
    }
  
    atualizar(funcionario: Funcionario) : void { 
      const Funcionarios = this.listarTodos();
      Funcionarios.forEach( (obj, index, objs) => {
        if(funcionario.cpf === obj.cpf)
          objs[index] = funcionario;
      });
  
      localStorage [LS_CHAVE] = JSON.stringify(Funcionarios);
    }
    
    remover(cpf: string) : void {
      let Funcionarios = this.listarTodos();
      Funcionarios = Funcionarios.filter(Funcionario => Funcionario.cpf !== cpf);
      localStorage[LS_CHAVE] = JSON.stringify(Funcionarios);
    }
  
}

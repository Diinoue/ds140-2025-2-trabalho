import { Injectable } from '@angular/core';

const LS_CHAVE = "equipamentos";

@Injectable({
  providedIn: 'root'
})
export class EquipamentoService {
  equipamentos: string[] = [];

  // Função buscarPorNome: Propósito - No momento do carregamento do componente de 
  // editar equipamento, essa função deve ser invocada para verificar se
  // o equipamento existe ou não.
  // Caso contrário, retornará um erro.
   

/*   buscarPorNome(nome: string): void {
    const equipamentos = localStorage[LS_CHAVE];
    equipamentos.find((eq, index, eqs) => 
      if(eqs[index] === nome)){

      }
    }
  }
 */
  listarTodos(): string[] {
    const equipamentos = localStorage[LS_CHAVE];
    return equipamentos ? JSON.parse(equipamentos) : [];
  }

  inserir(equipamento: string) : void {
    const equipamentos = this.listarTodos();
    equipamentos.push(equipamento);
    localStorage[LS_CHAVE] = JSON.stringify(equipamentos);
  }
    
  remover(equipamento: string) : void {
    let equipamentos = this.listarTodos();
    equipamentos = equipamentos.filter(equipamentos => equipamentos !== equipamento);
    localStorage[LS_CHAVE] = JSON.stringify(equipamentos);
  }

  atualizar(Novo: string, Velho: string) : void { 
    const equipamentos = this.listarTodos();
    equipamentos.forEach( (obj, index, objs) => {
      if(Velho === obj)
        objs[index] = Novo;
    });
    localStorage [LS_CHAVE] = JSON.stringify(equipamentos);
  }


}

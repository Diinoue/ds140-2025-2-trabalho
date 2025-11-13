import { inject, Injectable } from '@angular/core';
import { Equipamento } from '../shared/models/equipamento.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const LS_CHAVE = "equipamentos";

@Injectable({providedIn: 'root'}) 

export class EquipamentoService {

  private apiUrl = 'http://localhost:8080/equipamentos'
  private http = inject(HttpClient);
  equipamentos: Equipamento[] = [];

/*
MUDANÇAS EQUIPAMENTOS: Agr não sera mais armazenada em um vetor de string, será guardado
como um model;

*/


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

listarTodos(): Observable<Equipamento[]> {
  return this.http.get<Equipamento[]>(this.apiUrl)
}

inserir(equipamento: Equipamento): void {
  this.http.post<Equipamento>(this.apiUrl, equipamento)
}


  //Funções antigas
/* 
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
 */

}

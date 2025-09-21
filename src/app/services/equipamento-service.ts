import { Injectable } from '@angular/core';

const LS_CHAVE = "equipamentos";

@Injectable({
  providedIn: 'root'
})
export class EquipamentoService {
  equipamentos: string[] = [];


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

  atualizar(equipamento: string) : void { 
    const equipamentos = this.listarTodos();
    equipamentos.forEach( (obj, index, objs) => {
      if(equipamento === obj)
        objs[index] = equipamento;
    });

    localStorage [LS_CHAVE] = JSON.stringify(equipamentos);
  }


}

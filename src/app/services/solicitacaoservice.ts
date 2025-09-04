import { Injectable } from '@angular/core';
import { Solicitacao } from '../shared/models/solicitacao.model';

const LS_CHAVE = "solicitacoes";

@Injectable({
  providedIn: 'root',
})
export class Solicitacaoservice {
  solicitacoes: any[] = [];

  addSolicitacao(solicitacao: any): void {
      this.solicitacoes.push(solicitacao);
      // console.log('Dados da nova solicitação:', solicitacao);
  }

  getSolicitacoes(): any{
    return this.solicitacoes;
  }  

  listarTodos(): Solicitacao[] {
    const solicitacoes = localStorage[LS_CHAVE];
    return solicitacoes ? JSON.parse(solicitacoes) : [];
  }

  inserir(solicitacao: Solicitacao) : void {
    const solicitacoes = this.listarTodos();
    solicitacao.ID = new Date().getTime();
    solicitacoes.push(solicitacao);
    localStorage[LS_CHAVE] = JSON.stringify(solicitacoes);
  }

  buscarPorId(id: number) : Solicitacao | undefined {
    const solicitacoes = this.listarTodos();
    return solicitacoes.find(solicitacao => solicitacao.ID === id)
  }

  atualizar(solicitacao: Solicitacao) : void { 
    const solicitacoes = this.listarTodos();
    solicitacoes.forEach( (obj, index, objs) => {
      if(solicitacao.ID === obj.ID)
        objs[index] = solicitacao;
    });

    localStorage [LS_CHAVE] = JSON.stringify(solicitacoes);
  }
  
  remover(id: number) : void {
    let solicitacoes = this.listarTodos();
    solicitacoes = solicitacoes.filter(Solicitacao => Solicitacao.ID !== id);
    localStorage[LS_CHAVE] = JSON.stringify(solicitacoes);
  }


}

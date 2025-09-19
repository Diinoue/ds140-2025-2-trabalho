import { Injectable } from '@angular/core';
import { Solicitacao } from '../shared/models/solicitacao.model';
import { AlteracaoLog } from '../shared/models/alteracao-log';

const LS_CHAVE = "solicitacoes";

@Injectable({
  providedIn: 'root',
})
export class Solicitacaoservice {
  solicitacoes: any[] = [];
  alteracoes: any[] = [];

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


  
  addAlteracao(alteracao: AlteracaoLog): void {
    const alteracaoHist = this.getAlteracao();
    alteracaoHist.push(alteracao);
    localStorage["alt"] = JSON.stringify(alteracaoHist);    
  }

  getAlteracao() : AlteracaoLog[] {
    const alteracaoHist = localStorage["alt"];
    return alteracaoHist ? JSON.parse(alteracaoHist) : [];
  }

  getAlteracaoByService(ID: number): AlteracaoLog[] {
    const alteracaoHist = this.getAlteracao();
    return alteracaoHist.filter(a => a.solicitacaoID === ID);
  }


}

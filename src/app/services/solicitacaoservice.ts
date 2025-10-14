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

  /* ORDENA A Solicitacao[] POR DATA/HORA, USADO POR: rf003-pagcliente, lista-solicitacoes*/
  listarTodosOrdenadoData(): Solicitacao[]{
    const solicitacoes = this.listarTodos();
    return solicitacoes.sort(
      (a, b) => new Date(a.dataHora).getTime() - new Date(b.dataHora).getTime()
    );
  /* Pega as solicitações por funcionário  */
  }

  listarHoje(): Solicitacao[] {
    const hoje = new Date();
    return this.listarTodos().filter(solicitacao => {
      const data = solicitacao.dataHora;
      return (
        data.getDate() === hoje.getDate() &&
        data.getMonth() === hoje.getMonth() &&
        data.getFullYear() === hoje.getFullYear()
      );
    });
  }

  listarPeriodo(min: Date, max: Date): Solicitacao[] {
    const hoje = new Date();
    return this.listarTodos().filter(solicitacao => {
    const data = solicitacao.dataHora;
    return data >= min && data <= max;
  });
}

  inserir(solicitacao: Solicitacao) : void {
    const solicitacoes = this.listarTodos();
    solicitacao.ID = new Date().getTime();
    solicitacoes.push(solicitacao);
    localStorage[LS_CHAVE] = JSON.stringify(solicitacoes);
  }

  buscarPorId(id: number) : Solicitacao | undefined {
    const solicitacoes = this.listarTodos();
    return solicitacoes.find(solicitacao => solicitacao.ID === id);
  }

  buscarListaPorCliente(cpf: string) : Solicitacao[] | undefined {
    const solicitacoes = this.listarTodos();
    return solicitacoes.filter(solicitacao => solicitacao.clienteCPF === cpf);
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

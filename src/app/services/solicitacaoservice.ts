import { Injectable } from '@angular/core';

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

  
}

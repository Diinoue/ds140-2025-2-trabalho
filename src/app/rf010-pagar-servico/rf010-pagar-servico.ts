import { Component } from '@angular/core';
import { Solicitacaoservice } from '../services/solicitacaoservice';

@Component({
  selector: 'app-rf010-pagar-servico',
  imports: [],
  templateUrl: './rf010-pagar-servico.html',
  styleUrl: './rf010-pagar-servico.css'
})

export class Rf010PagarServico {
    solicitacoes: any[] = [];

constructor(private solicitacaoService: Solicitacaoservice) {
    this.solicitacoes = this.solicitacaoService.getSolicitacoes();
}

confirmarPagamento() {
  this.solicitacoes[0].estado = 'PAGA';
  this.solicitacoes[0].dataDePagamento = new Date();
}

  
}

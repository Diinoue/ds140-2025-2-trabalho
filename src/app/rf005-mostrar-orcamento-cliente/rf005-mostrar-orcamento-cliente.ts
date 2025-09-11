import { Component, OnInit } from '@angular/core';
import { Solicitacaoservice } from '../services/solicitacaoservice';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { Solicitacao } from '../shared/models/solicitacao.model';

@Component({
  selector: 'app-rf005-mostrar-orcamento-cliente',
  standalone: true, 
  imports: [DatePipe],
  templateUrl: './rf005-mostrar-orcamento-cliente.html', 
  styleUrls: ['./rf005-mostrar-orcamento-cliente.css'] 
})
export class Rf005MostrarOrcamentoCliente implements OnInit {
 
  solicitacoes: Solicitacao[] = [];
  motivoRejeicao: string = "";

  
  constructor(
    private solicitacaoService: Solicitacaoservice, 
    private router: Router 
  ) {}


  ngOnInit(): void {
    this.listarTodos();
  }

  listarTodos(): Solicitacao[] {
    return this.solicitacaoService.listarTodos();
  }

  aprovarServico(solicitacao: Solicitacao): void {
    alert(`Serviço Aprovado no Valor R$ ${solicitacao.valorOrcado}`);
    solicitacao.estado = 'APROVADA';

    this.solicitacaoService.atualizar(solicitacao);

    this.router.navigate(['/rf003']);
  }

  rejeitarServico(solicitacao: Solicitacao): void {
    const motivo = prompt("Por favor, informe o motivo da rejeição:");
 
    if (motivo && motivo.trim() !== '') {
      
      alert("Serviço Rejeitado!");
      solicitacao.estado = 'REJEITADA';
      this.solicitacaoService.atualizar(solicitacao);

      this.router.navigate(['/rf003']);

    } else {
   
      alert("O motivo da rejeição é obrigatório.");

    }
  }
}
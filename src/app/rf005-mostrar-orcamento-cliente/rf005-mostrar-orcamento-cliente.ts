import { Component, OnInit } from '@angular/core';
import { Solicitacaoservice } from '../services/solicitacaoservice';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rf005-mostrar-orcamento-cliente',
  standalone: true, 
  imports: [DatePipe],
  templateUrl: './rf005-mostrar-orcamento-cliente.html', 
  styleUrls: ['./rf005-mostrar-orcamento-cliente.css'] 
})
export class Rf005MostrarOrcamentoCliente implements OnInit {
 
  solicitacoes: any[] = [];
 
  motivoRejeicao: string = "";

  
  constructor(
    private solicitacaoService: Solicitacaoservice, 
    private router: Router 
  ) {}


  ngOnInit(): void {
   
    this.rf005showSolicitacoes();
  }

  
  rf005showSolicitacoes() {
    this.solicitacoes = this.solicitacaoService.getSolicitacoes();
  }

 
  aprovarServico(solicitacao: any): void {
    

    alert(`Serviço Aprovado no Valor R$ ${solicitacao.valorOrcado}`);
    
  
    solicitacao.status = 'APROVADA';
   
    this.router.navigate(['/rf003']);
  }


  rejeitarServico(solicitacao: any): void {

    const motivo = prompt("Por favor, informe o motivo da rejeição:");
 
    if (motivo && motivo.trim() !== '') {
      
      alert("Serviço Rejeitado!");
      
    
      solicitacao.status = 'REJEITADA';
      
    
      this.router.navigate(['/rf003']);

    } else {
   
      alert("O motivo da rejeição é obrigatório.");
    }
  }
}
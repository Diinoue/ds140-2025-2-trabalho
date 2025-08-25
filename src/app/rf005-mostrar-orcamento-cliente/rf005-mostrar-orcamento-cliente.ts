import { Component, OnInit } from '@angular/core';
import { Solicitacaoservice } from '../services/solicitacaoservice';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-rf005-mostrar-orcamento-cliente',
  imports: [DatePipe],
  templateUrl: './rf005-mostrar-orcamento-cliente.html',
  styleUrl: './rf005-mostrar-orcamento-cliente.css'
})
export class Rf005MostrarOrcamentoCliente implements OnInit{
  solicitacoes: any[] = [];

  constructor(private solicitacaoService: Solicitacaoservice) {};
  ngOnInit(): void {}

      rf005showSolicitacoes(){
    this.solicitacoes = this.solicitacaoService.getSolicitacoes();
    /*
      for(let i in this.solicitacoes){
      console.log(`${this.solicitacoes[i].descricaoEquipamento} ${this.solicitacoes[i].descricaoDefeito}`)
      }
    */
  }
  
}

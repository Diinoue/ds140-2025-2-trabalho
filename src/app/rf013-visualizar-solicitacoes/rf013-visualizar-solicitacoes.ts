import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Solicitacaoservice } from '../services/solicitacaoservice';
import { Solicitacao } from '../shared/models/solicitacao.model';

@Component({
  selector: 'app-rf013-visualizar-solicitacoes',
  standalone: true,
   imports:[CommonModule],
  templateUrl: './rf013-visualizar-solicitacoes.html',
  styleUrls: ['./rf013-visualizar-solicitacoes.css'],
})
export class Rf013VisualizarSolicitacoes implements OnInit{
    solicitacoes: Solicitacao[] = [];

  constructor(private solicitacaoService: Solicitacaoservice) {}

    ngOnInit(): void {
      this.solicitacoes = this.listarTodos();
    }
  
    listarTodos(): Solicitacao[] {
      return this.solicitacaoService.listarTodos();
    }


    
}
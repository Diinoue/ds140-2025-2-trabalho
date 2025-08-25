import { Component, OnInit} from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Solicitacaoservice } from '../services/solicitacaoservice';

@Component({
  selector: 'app-rf004-solicitacao',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePipe],
  templateUrl: './rf004-solicitacao.html',
  styleUrls: ['./rf004-solicitacao.css']
})
export class Rf004SolicitacaoComponent implements OnInit {

  descricaoEquipamento: string = '';
  categoriaEquipamento: string = '';
  descricaoDefeito: string = '';
  categorias: string[] = ['Notebook', 'Impressora', 'Desktop', 'Mouse', 'Teclado'];
  solicitacoes: any[] = [];

  constructor(private solicitacaoService: Solicitacaoservice) {}

  ngOnInit(): void {
  }

  enviarSolicitacao(): void {
    const novaSolicitacao = {
      dataHora: new Date(),
      descricaoEquipamento: this.descricaoEquipamento,
      categoriaEquipamento: this.categoriaEquipamento,
      descricaoDefeito: this.descricaoDefeito,
      estado: 'ABERTA'
    };
    
    this.solicitacaoService.addSolicitacao(novaSolicitacao); //this.solicitacoes.push(novaSolicitacao);
    this.solicitacoes = this.solicitacaoService.getSolicitacoes();   

    this.descricaoEquipamento = '';
    this.categoriaEquipamento = '';
    this.descricaoDefeito = '';
  }
}
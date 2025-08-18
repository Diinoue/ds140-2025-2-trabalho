import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

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

  constructor() { }

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
    
    this.solicitacoes.push(novaSolicitacao);
    
    console.log('Dados da nova solicitação:', novaSolicitacao);
    
    this.descricaoEquipamento = '';
    this.categoriaEquipamento = '';
    this.descricaoDefeito = '';
  }
}

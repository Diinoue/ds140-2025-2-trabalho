import { Component, OnInit} from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Solicitacaoservice } from '../services/solicitacaoservice';
import { Solicitacao } from '../shared/models/solicitacao.model';
import { Clienteservice } from '../services/clienteservice';
import { Cliente } from '../shared/models/cliente.model';

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
  solicitacoes: Solicitacao[] = [];
  novaSolicitacao: Solicitacao = new Solicitacao();
  constructor(private solicitacaoService: Solicitacaoservice, private clienteService: Clienteservice) {
  }

  ngOnInit(): void {
    this.solicitacoes = this.listarTodos();
  }

  listarTodos(): Solicitacao[] {
    return this.solicitacaoService.listarTodos();
  }

  enviarSolicitacao(): void {
    this.novaSolicitacao = {
      ID: this.solicitacoes.length,
      dataHora: new Date(),
      descricaoEquipamento: this.descricaoEquipamento,
      categoriaEquipamento: this.categoriaEquipamento,
      descricaoDefeito: this.descricaoDefeito,
      estado: 'ABERTA',
      valorOrcado: 0,
      clienteCPF: this.clienteService.getLogin(),
      dataDePagamento: new Date()
    };

    this.solicitacaoService.inserir(this.novaSolicitacao); //this.solicitacoes.push(novaSolicitacao);
    this.solicitacoes = this.listarTodos();   

    this.descricaoEquipamento = '';
    this.categoriaEquipamento = '';
    this.descricaoDefeito = '';
  }
}
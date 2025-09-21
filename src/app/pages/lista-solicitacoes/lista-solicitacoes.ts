import { Component } from '@angular/core';
import { Solicitacaoservice } from '../../services/solicitacaoservice';
import { DatePipe } from '@angular/common';
import { SlicePipe } from '@angular/common';
import { Solicitacao } from '../../shared/models/solicitacao.model';
import { Clienteservice } from '../../services/clienteservice';
import { Cliente } from '../../shared/models/cliente.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-rf011-pagina-inicial-funcionario',
  imports: [DatePipe, SlicePipe],
  templateUrl: './lista-solicitacoes.html',
  styleUrl: './lista-solicitacoes.css'
})
export class ListaSolicitacoes {
  solicitacoes: Solicitacao[] = [];
  clientes: string[] = [];

constructor (
  private solicitacaoService: Solicitacaoservice, 
){
}

ngOnInit(): void {
  this.solicitacoes = this.listarTodos();

}

listarTodos(): Solicitacao[] {
  return this.solicitacaoService.listarTodos();
}
}
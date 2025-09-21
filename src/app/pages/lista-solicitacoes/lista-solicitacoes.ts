import { Component } from '@angular/core';
import { Solicitacaoservice } from '../../services/solicitacaoservice';
import { DatePipe } from '@angular/common';
import { Funcionarioservice } from '../../services/funcionarioservice';
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
  loginFuncionario: number = 0;

constructor (
  private funcionarioService: Funcionarioservice,
  private solicitacaoService: Solicitacaoservice, 
){
}

ngOnInit(): void {
  this.solicitacoes = this.solicitacaoService.listarTodosOrdenadoData();
  this.loginFuncionario = this.funcionarioService.getLogin();
}

listarTodosOrdenado(): Solicitacao[]{
  console.log(this.solicitacaoService.listarTodosOrdenadoData());
  return this.solicitacaoService.listarTodosOrdenadoData();
}
}
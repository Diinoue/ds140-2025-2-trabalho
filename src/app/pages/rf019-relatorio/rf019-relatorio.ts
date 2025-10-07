import { Component } from '@angular/core';
import { Solicitacaoservice } from '../../services/solicitacaoservice';
import { DatePipe } from '@angular/common';
import { Funcionarioservice } from '../../services/funcionarioservice';
import { SlicePipe } from '@angular/common';
import { Solicitacao } from '../../shared/models/solicitacao.model';
@Component({
  selector: 'app-rf019-relatorio',
  imports: [DatePipe,SlicePipe],
  templateUrl: './rf019-relatorio.html',
  styleUrl: './rf019-relatorio.css'
})
export class Rf019Relatorio {
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

imprimirTela():void { 
window.print();

}

}

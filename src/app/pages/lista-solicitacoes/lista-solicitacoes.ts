import { Component } from '@angular/core';
import { Solicitacaoservice } from '../../services/solicitacaoservice';
import { Funcionarioservice } from '../../services/funcionarioservice';
import { SlicePipe } from '@angular/common';
import { Solicitacao } from '../../shared/models/solicitacao.model';


@Component({
  selector: 'app-rf011-pagina-inicial-funcionario',
  imports: [ SlicePipe],
  templateUrl: './lista-solicitacoes.html',
  styleUrl: './lista-solicitacoes.css'
})
export class ListaSolicitacoes {
  solicitacoes: Solicitacao[] = [];
  clientes: string[] = [];
  loginFuncionario: number = 0;

constructor (
  private solicitacaoService: Solicitacaoservice, 
){
}

ngOnInit(): void {
  this.carregarSolicitacoes();
}

carregarSolicitacoes() {
  this.solicitacaoService.listarTodas().subscribe(data => {
    this.solicitacoes = data;
  });
} 
}
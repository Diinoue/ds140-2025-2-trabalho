import { Component } from '@angular/core';
import { Solicitacaoservice } from '../../services/solicitacaoservice';
import { SlicePipe } from '@angular/common';
import { Solicitacao } from '../../shared/models/solicitacao.model';
import { DataptbrPipe } from '../../shared/pipes/dataptbr-pipe';


@Component({
  selector: 'app-rf011-pagina-inicial-funcionario',
  imports: [ SlicePipe, DataptbrPipe],
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
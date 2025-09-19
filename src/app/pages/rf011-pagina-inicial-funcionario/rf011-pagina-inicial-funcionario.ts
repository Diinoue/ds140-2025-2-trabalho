import { Component } from '@angular/core';
import { Solicitacaoservice } from '../../services/solicitacaoservice';
import { DatePipe } from '@angular/common';
import { SlicePipe } from '@angular/common';

@Component({
  selector: 'app-rf011-pagina-inicial-funcionario',
  imports: [DatePipe, SlicePipe],
  templateUrl: './rf011-pagina-inicial-funcionario.html',
  styleUrl: './rf011-pagina-inicial-funcionario.css'
})
export class Rf011PaginaInicialFuncionario {
  solicitacoes: any[] = [];

constructor (private solicitacaoService: Solicitacaoservice){
  this.solicitacoes = this.solicitacaoService.getSolicitacoes();
}
}
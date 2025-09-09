import { Component } from '@angular/core';
import { DatePipe, SlicePipe } from '@angular/common';
import { Solicitacaoservice } from '../services/solicitacaoservice';

@Component({
  selector: 'app-rf008-visualizar-servico',
  imports: [DatePipe, SlicePipe], 
  templateUrl: './rf008-visualizar-servico.html',
  styleUrl: './rf008-visualizar-servico.css'
})
export class RF008VisualizarServico {

  solicitacoes: any[] = [];

  constructor(private solicitacaoService: Solicitacaoservice) {} 
teste()
{
  console.log("aaaaa");
}
  ngOnInit(): void {}

  metdado_serivice() 
  {
    this.solicitacoes = this.solicitacaoService.getSolicitacoes();
  }
}

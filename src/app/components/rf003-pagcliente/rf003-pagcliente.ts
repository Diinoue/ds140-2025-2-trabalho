import { Component } from '@angular/core';
import { DatePipe, SlicePipe } from '@angular/common';
import { Solicitacaoservice } from '../../services/solicitacaoservice';

@Component
  ({
  selector: 'app-rf003-pagcliente',
  imports: [DatePipe, SlicePipe], 
  templateUrl: './rf003-pagcliente.html',
  styleUrl: './rf003-pagcliente.css'
  })
export class Rf003Pagcliente 
{
  solicitacoes: any[] = [];

  constructor(private solicitacaoService: Solicitacaoservice) {} 

  ngOnInit(): void {}

  metdado_serivice() 
  {
    this.solicitacoes = this.solicitacaoService.getSolicitacoes();
  }
}
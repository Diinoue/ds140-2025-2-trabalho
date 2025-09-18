import { Component, OnInit } from '@angular/core';
import { DatePipe, SlicePipe } from '@angular/common';
import { Solicitacaoservice } from '../../services/solicitacaoservice';
import { Solicitacao } from '../../shared/models/solicitacao.model';

@Component
  ({
  selector: 'app-rf003-pagcliente',
  imports: [DatePipe, SlicePipe], 
  templateUrl: './rf003-pagcliente.html',
  styleUrl: './rf003-pagcliente.css'
  })
export class Rf003Pagcliente implements OnInit
{
  solicitacoes: Solicitacao[] = [];

  constructor(private solicitacaoService: Solicitacaoservice) {} 

  ngOnInit(): void {
    this.solicitacoes = this.listarTodos();
  }

  listarTodos(): Solicitacao[] {
    return this.solicitacaoService.listarTodos();
  }
}
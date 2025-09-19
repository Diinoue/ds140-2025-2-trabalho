import { Component, OnInit } from '@angular/core';
import { DatePipe, SlicePipe } from '@angular/common';
import { Solicitacao } from '../../shared/models/solicitacao.model';
import { Solicitacaoservice } from '../../services/solicitacaoservice';
import { Clienteservice } from '../../services/clienteservice';
import { UntypedFormArray } from '@angular/forms';

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

  constructor(private solicitacaoService: Solicitacaoservice, private clienteService: Clienteservice) {} 

  ngOnInit(): void {
    const vet = this.solicitacaoService.buscarListaPorCliente(this.clienteService.getLogin());
    if(vet != undefined) this.solicitacoes = vet;
    else throw new Error ("Nenhuma solicitacao encontrada");
  }
}
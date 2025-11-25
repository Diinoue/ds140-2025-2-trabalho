import { Component, OnInit } from '@angular/core';
import { SlicePipe } from '@angular/common';
import { Solicitacao } from '../../shared/models/solicitacao.model';
import { Solicitacaoservice } from '../../services/solicitacaoservice';
import { Loginservice } from '../../services/loginservice';
import { Usuario } from '../../shared/models/usuario.model';
import { DataptbrPipe } from '../../shared/pipes/dataptbr-pipe';

@Component
  ({
  selector: 'app-rf003-pagcliente',
  imports: [SlicePipe, DataptbrPipe], 
  templateUrl: './rf003-pagcliente.html',
  styleUrl: './rf003-pagcliente.css'
  })
export class Rf003Pagcliente implements OnInit
{
  solicitacoes: Solicitacao[] = [];
  login: Usuario = new Usuario();

  constructor(
    private solicitacaoService: Solicitacaoservice,
    private loginService: Loginservice,
  ) {} 

  ngOnInit(): void {
    let res = this.loginService.usuarioLogado;
    if (res !== null) this.login = res;
    else throw new Error ("usuario nao encontrado");
    this.carregarSolicitacoes(this.login.id!);
  }

  carregarSolicitacoes(id: number) {
  this.solicitacaoService.buscarListaPorCliente(id)
    .subscribe(solicitacoesOrdenadas => {
      this.solicitacoes = solicitacoesOrdenadas;
    });
}

}
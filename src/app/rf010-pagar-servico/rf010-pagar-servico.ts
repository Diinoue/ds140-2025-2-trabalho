import { Component, OnInit } from '@angular/core';
import { Solicitacaoservice } from '../services/solicitacaoservice';
import { Solicitacao } from '../shared/models/solicitacao.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from '../shared/models/cliente.model';
import { Clienteservice } from '../services/clienteservice';

@Component({
  selector: 'app-rf010-pagar-servico',
  imports: [],
  templateUrl: './rf010-pagar-servico.html',
  styleUrl: './rf010-pagar-servico.css'
})

export class Rf010PagarServico implements OnInit {
solicitacao: Solicitacao = new Solicitacao();
cliente: Cliente = new Cliente();
constructor(
  private solicitacaoService: Solicitacaoservice,
  private route: ActivatedRoute,
  private clienteService: Clienteservice,
) {}

  ngOnInit(): void {
    let id = +this.route.snapshot.params['id'];
    const res = this.solicitacaoService.buscarPorId(id);
    if (res !== undefined){
      this.solicitacao = res;
      const res2 = this.clienteService.buscarPorId(this.solicitacao.clienteCPF);
      if (res2 !== undefined) this.cliente = res2;
      else throw new Error ("Pessoa não encontrada: id = " + id);
    }
    else
      throw new Error ("Pessoa não encontrada: id = " + id);
  }

confirmarPagamento() {
  this.solicitacao.estado = 'PAGA';
  this.solicitacao.dataDePagamento = new Date();
  this.solicitacaoService.atualizar(this.solicitacao);
}

  
}

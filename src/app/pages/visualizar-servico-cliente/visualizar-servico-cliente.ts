import { Component, OnInit } from '@angular/core';
import { Solicitacaoservice } from '../../services/solicitacaoservice';
import { Solicitacao } from '../../shared/models/solicitacao.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from '../../shared/models/cliente.model';
import { Clienteservice } from '../../services/clienteservice';
import { CommonModule, DatePipe } from '@angular/common';
import { AlteracaoLog } from '../../shared/models/alteracao-log';
import { Funcionario } from '../../shared/models/funcionario.model';
import { Funcionarioservice } from '../../services/funcionarioservice';
import { Alteracaoservice } from '../../services/alteracaoservice';

@Component({
  selector: 'visualizar-servico-cliente',
  imports: [DatePipe, CommonModule],
  templateUrl: './visualizar-servico-cliente.html',
  styleUrl: './visualizar-servico-cliente.css'
})

export class VisualizarServicoCliente implements OnInit {
solicitacao: Solicitacao = new Solicitacao();
cliente: Cliente = new Cliente(0, '', '', '', 'cliente', false, '', '', '');
alteracaoHist: AlteracaoLog[] = [];
alteracao: AlteracaoLog = new AlteracaoLog();
funcionario: Funcionario = new Funcionario();
id: number = 0;

constructor(
  private solicitacaoService: Solicitacaoservice,
  private route: ActivatedRoute,
  private clienteService: Clienteservice,
  private router: Router,
  private alteracaoService: Alteracaoservice,
  private funcionarioService: Funcionarioservice,

) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.params['id'];
    this.carregarSolicitacao(this.id);
    this.carregarAlteracoes(this.id);
  }

voltar() {
    this.router.navigate(['funcionario']);
  }

  carregarSolicitacao(id: number) {
  this.solicitacaoService.buscarPorId(id).subscribe(data => {
    this.solicitacao = data;
    console.log(this.solicitacao);
    this.carregarAlteracoes(this.solicitacao.id!);
  });
}

  carregarAlteracoes(id: number) {
  this.alteracaoService.buscarPorSolicitacao(id).subscribe(data => {
    // CORREÇÃO: Garante que alteracaoHist é um array mesmo se 'data' for null
    this.alteracaoHist = data || []; 
    console.log(this.alteracaoHist);
  });
}

  atualizarSolicitacao(solicitacao: Solicitacao) {
    this.solicitacaoService.atualizar(this.solicitacao).subscribe(data => {
    this.carregarSolicitacao(solicitacao.id!);
  });
  }

  aprovarServico() {
    alert(`Serviço aprovado no valor de R$ ${this.solicitacao.valorOrcado}`);
    this.solicitacao.estado = 'APROVADA';
    this.atualizarSolicitacao(this.solicitacao);
    this.registrarAlteracao('Serviço Aprovado', '');
  }

  rejeitarServico() {
    const motivo = prompt('Informe o motivo da rejeição:');
    if (motivo !== null && motivo.trim() !== '') {
      alert('Serviço rejeitado');
      this.solicitacao.motivo = motivo;
      this.solicitacao.estado = 'REJEITADA';
      this.atualizarSolicitacao(this.solicitacao);
      this.registrarAlteracao('Serviço Rejeitado', motivo);
      this.router.navigate(['cliente']);
    }
  }

  resgatarServico() {
    this.solicitacao.estado = 'APROVADA';
    this.atualizarSolicitacao(this.solicitacao);
    this.registrarAlteracao('Serviço Resgatado', '');
    console.log('Histórico: serviço resgatado em', new Date());
    alert('Serviço resgatado e aprovado novamente');
      this.router.navigate(['cliente']);
  }

  pagarServico() {
    this.solicitacao.estado = 'PAGA';
    this.solicitacao.dataDePagamento = new Date();
    this.atualizarSolicitacao(this.solicitacao);
    this.registrarAlteracao('Serviço Pago', '');
    alert('Serviço Pago');
  }
  
  registrarAlteracao(tipo : string, desc : string) 
  {
    this.alteracao.solicitacaoID = this.solicitacao.id!;
    this.alteracao.data = new Date();
    this.alteracao.tipo = tipo;
    this.alteracao.descricao = desc;
    console.log(this.alteracao);
    this.alteracaoService.inserir(this.alteracao).subscribe(data => {
      this.carregarAlteracoes(this.solicitacao.id!);
  });
  }

}

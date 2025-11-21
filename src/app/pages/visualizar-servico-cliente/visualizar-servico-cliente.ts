import { Component, OnInit } from '@angular/core';
import { Solicitacaoservice } from '../../services/solicitacaoservice';
import { Solicitacao } from '../../shared/models/solicitacao.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from '../../shared/models/cliente.model';
import { Clienteservice } from '../../services/clienteservice';
import { DatePipe } from '@angular/common';
import { dateTimestampProvider } from 'rxjs/internal/scheduler/dateTimestampProvider';
import { AlteracaoLog } from '../../shared/models/alteracao-log';
import { Funcionario } from '../../shared/models/funcionario.model';
import { Funcionarioservice } from '../../services/funcionarioservice';
import { Alteracaoservice } from '../../services/alteracaoservice';

@Component({
  selector: 'visualizar-servico-cliente',
  imports: [DatePipe],
  templateUrl: './visualizar-servico-cliente.html',
  styleUrl: './visualizar-servico-cliente.css'
})

export class visualizarServicoCliente implements OnInit {
solicitacao: Solicitacao = new Solicitacao();
cliente: Cliente = new Cliente();
alteracaoHist: AlteracaoLog[] = [];
alteracao: AlteracaoLog = new AlteracaoLog();
funcionario: Funcionario = new Funcionario();

constructor(
  private solicitacaoService: Solicitacaoservice,
  private route: ActivatedRoute,
  private clienteService: Clienteservice,
  private router: Router,
  private alteracaoService: Alteracaoservice,
  private funcionarioService: Funcionarioservice,

) {}

  ngOnInit(): void {
    let id = +this.route.snapshot.params['id'];
    this.carregarSolicitacao(id);
    this.carregarAlteracoes(id);

    this.clienteService.buscarPorId(this.solicitacao.clienteId).subscribe(data => {this.cliente = data;});

    if(this.solicitacao.estado !== 'ABERTA')
    {
    this.funcionarioService.buscarPorId(this.solicitacao.funcionarioId).subscribe(data => {this.funcionario = data;});
    }
  }

  carregarSolicitacao(id: number) {
  this.solicitacaoService.buscarPorId(id).subscribe(data => {
    this.solicitacao = data;
  });
}

  carregarAlteracoes(id: number) {
  this.alteracaoService.buscarPorId(id).subscribe(data => {
    this.alteracaoHist = data;
  });
}

  aprovarServico() {
    alert(`Serviço aprovado no valor de R$ ${this.solicitacao.valorOrcado}`);
    this.solicitacao.estado = 'APROVADA';
    this.solicitacaoService.atualizar(this.solicitacao);
    this.registrarAlteracao('Serviço Aprovado', '');
  }

  rejeitarServico() {
    const motivo = prompt('Informe o motivo da rejeição:');
    if (motivo !== null && motivo.trim() !== '') {
      alert('Serviço rejeitado');
      this.solicitacao.motivo = motivo;
      this.solicitacao.estado = 'REJEITADA';
      this.solicitacaoService.atualizar(this.solicitacao);
      this.registrarAlteracao('Serviço Rejeitado', motivo);
      this.router.navigate(['cliente']);
    }
  }

  resgatarServico() {
    this.solicitacao.estado = 'APROVADA';
    this.solicitacaoService.atualizar(this.solicitacao);
    this.registrarAlteracao('Serviço Resgatado', '');
    console.log('Histórico: serviço resgatado em', new Date());
    alert('Serviço resgatado e aprovado novamente');
      this.router.navigate(['cliente']);
  }

  pagarServico() {
    this.solicitacao.estado = 'PAGA';
    this.solicitacao.dataDePagamento = this.formatarData(new Date());
    this.solicitacaoService.atualizar(this.solicitacao);
    this.registrarAlteracao('Serviço Pago', '');
    alert('Serviço Pago');
  }
  
  registrarAlteracao(tipo : string, desc : string) {
    this.alteracao.solicitacaoID = this.solicitacao.id;
    this.alteracao.data = new Date();
    this.alteracao.tipo = tipo;
    this.alteracao.descricao = desc;
    this.alteracaoService.inserir(this.alteracao);
    this.carregarAlteracoes(this.solicitacao.id);
  }

formatarData(date: Date): string {
  return date.toISOString().split('.')[0];
}

}

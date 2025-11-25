import { Component, OnInit } from '@angular/core';
import { Solicitacaoservice } from '../../services/solicitacaoservice';
import { Solicitacao } from '../../shared/models/solicitacao.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from '../../shared/models/cliente.model';
import { CommonModule } from '@angular/common';
import { Historico } from '../../shared/models/historico';
import { Funcionario } from '../../shared/models/funcionario.model';
import { Alteracaoservice } from '../../services/alteracaoservice';
import { DataptbrPipe } from '../../shared/pipes/dataptbr-pipe';
import { EquipamentoService } from '../../services/equipamento-service';
import { Equipamento } from '../../shared/models/equipamento.model';

@Component({
  selector: 'visualizar-servico-cliente',
  standalone: true,
  imports: [DataptbrPipe, CommonModule],
  templateUrl: './visualizar-servico-cliente.html',
  styleUrls: ['./visualizar-servico-cliente.css']
})
export class VisualizarServicoCliente implements OnInit {
  solicitacao: Solicitacao = new Solicitacao();
  alteracaoHist: Historico[] = [];
  alteracao: Historico = new Historico();
  equipamento: Equipamento = new Equipamento();
  id: number = 0;

  constructor(
    private solicitacaoService: Solicitacaoservice,
    private route: ActivatedRoute,
    private router: Router,
    private alteracaoService: Alteracaoservice,
    private equipamentoService: EquipamentoService,
  ) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.params['id'];
    this.carregarSolicitacao(this.id);
    this.carregarAlteracoes(this.id);
  }

  voltar() {
    this.router.navigate(['cliente']);
  }

  carregarSolicitacao(id: number) {
    this.solicitacaoService.buscarPorId(id).subscribe(data => {
      this.solicitacao = data;
      this.carregarAlteracoes(this.solicitacao.id!);
      this.carregarEquipamento(this.solicitacao.equipamentoId);
    });
  }

  carregarEquipamento(id: number) {
    this.equipamentoService.buscarPorId(id).subscribe(data => {
      this.equipamento = data;
    });
  }

  carregarAlteracoes(id: number) {
    this.alteracaoService.buscarPorSolicitacao(id).subscribe(data => {
      this.alteracaoHist = data || [];
    });
  }

  atualizarSolicitacao(solicitacao: Solicitacao) {
    this.solicitacaoService.atualizar(this.solicitacao).subscribe(() => {
      this.carregarSolicitacao(solicitacao.id!);
    });
  }

  aprovarServico() {
    alert(`Serviço aprovado no valor de R$ ${this.solicitacao.valor}`);
    this.solicitacao.estado = 'APROVADA';
    this.atualizarSolicitacao(this.solicitacao);
    this.registrarAlteracao('Serviço Aprovado', '');
  }

  rejeitarServico() {
    const motivo = prompt('Informe o motivo da rejeição:');
    if (motivo && motivo.trim() !== '') {
      alert('Serviço rejeitado');
      this.solicitacao.orientacoes = motivo; // ✅ substitui 'motivo'
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
    alert('Serviço resgatado e aprovado novamente');
    this.router.navigate(['cliente']);
  }

  pagarServico() {
    this.solicitacao.estado = 'PAGA';
    // ✅ não existe mais dataDePagamento, registrar via AlteracaoLog
    this.atualizarSolicitacao(this.solicitacao);
    this.registrarAlteracao('Serviço Pago', '');
    alert('Serviço Pago');
  }
  
  registrarAlteracao(tipo: string, desc: string) {
    this.alteracao.solicitacaoID = this.solicitacao.id!;
    this.alteracao.data = new Date();
    this.alteracao.tipo = tipo;
    this.alteracao.descricao = desc;
    this.alteracaoService.inserir(this.alteracao).subscribe(() => {
      this.carregarAlteracoes(this.solicitacao.id!);
    });
  }
}

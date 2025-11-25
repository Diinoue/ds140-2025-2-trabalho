import { Component, OnInit } from '@angular/core';
import { Solicitacaoservice } from '../../services/solicitacaoservice';
import { Solicitacao } from '../../shared/models/solicitacao.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Historico } from '../../shared/models/historico';
import { HistoricoService } from '../../services/historicoservice';
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
  alteracao: Historico = {} as Historico;
  equipamento: Equipamento = new Equipamento();
  id: number = 0;

  constructor(
    private solicitacaoService: Solicitacaoservice,
    private route: ActivatedRoute,
    private router: Router,
    private historicoService: HistoricoService,  
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
    this.historicoService.buscarPorSolicitacao(id).subscribe((data: Historico[]) => {
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
    this.registrarAlteracao('APROVADA', 'Serviço aprovado');
  }

  rejeitarServico() {
    const motivo = prompt('Informe o motivo da rejeição:');
    if (motivo && motivo.trim() !== '') {
      alert('Serviço rejeitado');
      this.solicitacao.orientacoes = motivo;
      this.solicitacao.estado = 'REJEITADA';
      this.atualizarSolicitacao(this.solicitacao);
      this.registrarAlteracao('REJEITADA', motivo);
      this.router.navigate(['cliente']);
    }
  }

  resgatarServico() {
    this.solicitacao.estado = 'APROVADA';
    this.atualizarSolicitacao(this.solicitacao);
    this.registrarAlteracao('APROVADA', 'Serviço resgatado e aprovado novamente');
    alert('Serviço resgatado e aprovado novamente');
    this.router.navigate(['cliente']);
  }

  pagarServico() {
    this.solicitacao.estado = 'PAGA';
    this.atualizarSolicitacao(this.solicitacao);
    this.registrarAlteracao('PAGA', 'Serviço pago');
    alert('Serviço Pago');
  }
  
  registrarAlteracao(tipo: string, desc: string) {
    const novoHistorico: Historico = {
      solicitacaoId: this.solicitacao.id!,
      funcionarioId: 1, 
      descricao: desc,
      tipo: tipo,
      nomeFuncionario: 'Cliente' 
    };

    this.historicoService.inserir(novoHistorico).subscribe(() => {
      this.carregarAlteracoes(this.solicitacao.id!);
    });
  }
}

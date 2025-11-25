import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Solicitacao } from '../../shared/models/solicitacao.model';
import { Funcionario } from '../../shared/models/funcionario.model';
import { Historico } from '../../shared/models/historico';
import { Usuario } from '../../shared/models/usuario.model';

import { Solicitacaoservice } from '../../services/solicitacaoservice';
import { Loginservice } from '../../services/loginservice';
import { Funcionarioservice } from '../../services/funcionarioservice';
import { HistoricoService } from '../../services/historicoservice';

@Component({
  selector: 'visualizar-servico-funcionario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './visualizar-servico-funcionario.html',
  styleUrls: ['./visualizar-servico-funcionario.css']
})
export class VisualizarServicoFuncionario implements OnInit {
  solicitacao: Solicitacao = new Solicitacao();
  funcionarios: Funcionario[] = [];
  alteracaoHist: Historico[] = [];
  funcionarioLogin: Usuario = new Usuario();
  redirecionar: boolean = false;
  novaAlteracao: Historico = new Historico();
  descricaoManutencao: string = '';
  orientacoesCliente: string = '';

  constructor(
    private solicitacaoService: Solicitacaoservice,
    private route: ActivatedRoute,
    private loginService: Loginservice,
    private funcionarioService: Funcionarioservice,
    private historicoService: HistoricoService, 
    private router: Router,
  ) {}

  ngOnInit(): void {
    const res3 = this.loginService.usuarioLogado;
    if (res3 == null) throw new Error("Usuário não encontrado");
    else this.funcionarioLogin = res3;

    const id = +this.route.snapshot.params['id'];
    this.carregarSolicitacao(id);
    this.carregarAlteracoes(id);
    this.carregarFuncionarios();
  }

  voltar(): void {
    this.router.navigate(['funcionario']);
  }

  carregarSolicitacao(id: number): void {
    this.solicitacaoService.buscarPorId(id).subscribe({
      next: (data: Solicitacao) => this.solicitacao = data,
      error: () => alert('Erro ao carregar solicitação')
    });
  }

  carregarAlteracoes(id: number): void {
    this.historicoService.buscarPorSolicitacao(id).subscribe({
      next: (data: Historico[]) => this.alteracaoHist = data || [],
      error: () => alert('Erro ao carregar histórico de alterações')
    });
  }

  carregarFuncionarios(): void {
    this.funcionarioService.listarTodos().subscribe({
      next: (data: Funcionario[]) => this.funcionarios = data || [],
      error: () => alert('Erro ao carregar funcionários')
    });
  }

  atualizarSolicitacao(): void {
    this.solicitacaoService.atualizar(this.solicitacao).subscribe({
      next: () => this.carregarSolicitacao(this.solicitacao.id!),
      error: () => alert('Erro ao atualizar solicitação')
    });
  }

  efetuarManutencao(): void {
    this.solicitacao.estado = 'ARRUMADA';
    this.solicitacao.orientacoes = this.orientacoesCliente;
    this.atualizarSolicitacao();
    this.registrarAlteracao('ARRUMADA', this.descricaoManutencao);
  }

  redirecionarManutencao(func: Funcionario): void {
    this.solicitacao.funcionarioId = func.id!;
    this.solicitacao.estado = 'REDIRECIONADA';
    this.novaAlteracao.nomeFuncionario = func.nome;
    this.atualizarSolicitacao();
    this.registrarAlteracao('REDIRECIONADA', `Redirecionado para ${func.nome}`);
  }

  salvarOrcamento(): void {
    this.solicitacao.estado = 'ORCADA';
    this.solicitacao.funcionarioId = this.funcionarioLogin.id!;
    this.novaAlteracao.nomeFuncionario = this.funcionarioLogin.nome;
    this.atualizarSolicitacao();
    this.registrarAlteracao('ORCADA', '');
  }

  finalizarSolicitacao(): void {
    this.solicitacao.estado = 'FINALIZADA';
    this.atualizarSolicitacao();
    this.registrarAlteracao('FINALIZADA', '');
  }

  registrarAlteracao(tipo: string, desc: string): void {
    const nova: Historico = {
      solicitacaoId: this.solicitacao.id!,
      funcionarioId: this.funcionarioLogin.id!,
      descricao: desc,
      tipo: tipo,
      nomeFuncionario: this.funcionarioLogin.nome
    };

    this.historicoService.inserir(nova).subscribe({
      next: () => this.carregarAlteracoes(this.solicitacao.id!),
      error: () => alert('Erro ao registrar alteração')
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Solicitacao } from '../../shared/models/solicitacao.model';
import { Cliente } from '../../shared/models/cliente.model';
import { Funcionario } from '../../shared/models/funcionario.model';
import { AlteracaoLog } from '../../shared/models/alteracao-log';
import { Usuario } from '../../shared/models/usuario.model';

export enum EstadoSolicitacao {
  ABERTA = 'ABERTA',
  ORCADA = 'ORCADA',
  REJEITADA = 'REJEITADA',
  APROVADA = 'APROVADA',
  REDIRECIONADA = 'REDIRECIONADA',
  ARRUMADA = 'ARRUMADA',
  PAGA = 'PAGA',
  FINALIZADA = 'FINALIZADA'
}

@Component({
  selector: 'visualizar-servico-funcionario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './visualizar-servico-funcionario.html',
  styleUrl: './visualizar-servico-funcionario.css'
})
export class VisualizarServicoFuncionario implements OnInit {
  solicitacao: Solicitacao = new Solicitacao();
  cliente: Cliente = new Cliente(0, '', '', '', 'cliente', false, '', '', '');
  funcionarios: Funcionario[] = [];
  alteracaoHist: AlteracaoLog[] = [];
  funcionarioLogin: Usuario = new Usuario();
  redirecionar: boolean = false;

  descricaoManutencao: string = '';
  orientacoesCliente: string = '';

  constructor(
    private solicitacaoService: Solicitacaoservice,
    private route: ActivatedRoute,
    private loginService: Loginservice,
    private funcionarioService: Funcionarioservice,
    private alteracaoService: Alteracaoservice,
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
      next: (data) => this.solicitacao = data,error: (err) => alert('Erro ao carregar solicitação')
    });
  }

  carregarAlteracoes(id: number): void {
    this.alteracaoService.buscarPorSolicitacao(id).subscribe({
      next: (data) => this.alteracaoHist = data || [],error: (err) => alert('Erro ao carregar histórico de alterações')
    });
  }

  carregarFuncionarios(): void {
    this.funcionarioService.listarTodos().subscribe({
      next: (data) => this.funcionarios = data || [],error: (err) => alert('Erro ao carregar funcionários')
    });
  }

  atualizarSolicitacao(): void {
    this.solicitacaoService.atualizar(this.solicitacao).subscribe({
      next: () => this.carregarSolicitacao(this.solicitacao.id!),
      error: (err) => alert('Erro ao atualizar solicitação')
    });
  }

  efetuarManutencao(): void {
    this.solicitacao.estado = EstadoSolicitacao.ARRUMADA;
    this.solicitacao.orientacoes = (this.solicitacao.orientacoes || '') + '\n' + this.orientacoesCliente;
    this.atualizarSolicitacao();
    this.registrarAlteracao('Manutenção Efetuada', this.descricaoManutencao);
  }

  redirecionarManutencao(func: Funcionario): void {
    this.solicitacao.funcionarioId = func.id!;
    this.solicitacao.estado = EstadoSolicitacao.REDIRECIONADA;
    this.atualizarSolicitacao();
    this.registrarAlteracao('Serviço Redirecionado', `Redirecionado para ${func.nome}`);
  }

  salvarOrcamento(): void {
    this.solicitacao.estado = EstadoSolicitacao.ORCADA;
    this.solicitacao.funcionarioId = this.funcionarioLogin.id!;
    this.atualizarSolicitacao();
    this.registrarAlteracao('Serviço Orçado', '');
  }

  finalizarSolicitacao(): void {
    this.solicitacao.estado = EstadoSolicitacao.FINALIZADA;
    this.atualizarSolicitacao();
    this.registrarAlteracao('Serviço Finalizado', '');
  }

  registrarAlteracao(tipo: string, desc: string): void {
    const novaAlteracao = new AlteracaoLog();
    novaAlteracao.solicitacaoID = this.solicitacao.id!;
    novaAlteracao.data = new Date();
    novaAlteracao.tipo = tipo;
    novaAlteracao.descricao = desc;
    novaAlteracao.nomeFuncionario = this.funcionarioLogin.nome;

    this.alteracaoService.inserir(novaAlteracao).subscribe({
      next: () => this.carregarAlteracoes(this.solicitacao.id!),
      error: (err) => alert('Erro ao registrar alteração')
    });
  }
}

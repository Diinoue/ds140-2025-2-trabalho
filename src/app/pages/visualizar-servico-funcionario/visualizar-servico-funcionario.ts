import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Solicitacaoservice } from '../../services/solicitacaoservice';
import { ActivatedRoute, Router } from '@angular/router';
import { Clienteservice } from '../../services/clienteservice';
import { Solicitacao } from '../../shared/models/solicitacao.model';
import { Cliente } from '../../shared/models/cliente.model';
import { Funcionario } from '../../shared/models/funcionario.model';
import { Funcionarioservice } from '../../services/funcionarioservice';
import { AlteracaoLog } from '../../shared/models/alteracao-log';
import { Loginservice } from '../../services/loginservice';
import { Usuario } from '../../shared/models/usuario.model';
import { Alteracaoservice } from '../../services/alteracaoservice';

@Component({
  selector: 'visualizar-servico-funcionario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './visualizar-servico-funcionario.html',
  styleUrl: './visualizar-servico-funcionario.css'
})
export class VisualizarServicoFuncionario implements OnInit{
  solicitacao: Solicitacao = new Solicitacao();
  cliente: Cliente = new Cliente(0, '', '', '', 'cliente', false, '', '', '');
  funcionarios: Funcionario[] = [];
  alteracao: AlteracaoLog = new AlteracaoLog();
  alteracaoHist: AlteracaoLog[] = [];
  funcionarioLogin: Usuario = new Usuario();
  redirecionar: boolean = false;

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
    if (res3 == null) throw new Error ("usuario nao encontrado");
    else this.funcionarioLogin = res3;

    let id = +this.route.snapshot.params['id'];
    this.carregarSolicitacao(id);
    this.carregarFuncionarios();
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

carregarFuncionarios() {
  this.funcionarioService.listarTodos().subscribe(data => {
    this.funcionarios = data || []; 
  });
}

  atualizarSolicitacao(solicitacao: Solicitacao) {
    this.solicitacaoService.atualizar(this.solicitacao).subscribe(data => {
    this.carregarSolicitacao(solicitacao.id!);
  });
  }

  efetuarManutencao() {
    this.solicitacao.estado = 'ARRUMADA';
    this.atualizarSolicitacao(this.solicitacao);
    this.registrarAlteracao('Manutenção Efetuada', '');
  }

  redirecionarManutencao(func: Funcionario) {
    this.alteracao.nomeFuncionarioRedirecionado = func.nome;
    console.log('Redirecionado para: ', func.nome);
    this.alteracao.nomeFuncionario = this.funcionarioLogin.nome;
    this.alteracao.solicitacaoID = this.solicitacao.id!;
    this.alteracao.data = new Date();
    this.alteracao.tipo = 'Serviço Redirecionado';
    this.alteracao.descricao = '';
    this.alteracaoService.inserir(this.alteracao).subscribe(data => {
      this.carregarAlteracoes(this.solicitacao.id!);
      console.log(this.solicitacao)
  });

    this.solicitacao.funcionarioId = func.id!;
    
    this.solicitacao.estado = 'REDIRECIONADA';
    this.atualizarSolicitacao(this.solicitacao);
    }

  /* Função executada quando Estado: ABERTA, para fazer a proposta do orçamento */
  salvarOrcamento(): void {
    this.solicitacao.estado = 'ORCADA';
    this.solicitacao.funcionarioId = this.funcionarioLogin.id!;
    this.atualizarSolicitacao(this.solicitacao);
    this.alteracao.nomeFuncionario = this.funcionarioLogin.nome;
    this.registrarAlteracao('Serviço Orçado', '');
  }

  finalizarSolicitacao() : void {
    this.solicitacao.estado = 'FINALIZADA';
    this.atualizarSolicitacao(this.solicitacao);
    this.registrarAlteracao('Serviço Finalizado', '');
  }

  registrarAlteracao(tipo : string, desc : string): void {
    this.alteracao.solicitacaoID = this.solicitacao.id!;
    this.alteracao.data = new Date();
    this.alteracao.tipo = tipo;
    this.alteracao.descricao = desc;
    this.alteracao.nomeFuncionario = this.funcionarioLogin.nome;
    this.alteracaoService.inserir(this.alteracao).subscribe(data => {
      this.carregarAlteracoes(this.solicitacao.id!);
      console.log(this.alteracao);
  });
  }
}
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

@Component({
  selector: 'visualizar-servico-funcionario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './visualizar-servico-funcionario.html',
  styleUrl: './visualizar-servico-funcionario.css'
})
export class VisualizarServicoFuncionario implements OnInit{
  solicitacao: Solicitacao = new Solicitacao();
  cliente: Cliente = new Cliente();
  funcionarios: Funcionario[] = [];
  alteracao: AlteracaoLog = new AlteracaoLog();
  alteracaoHist: AlteracaoLog[] = [];
  funcionarioLogin: number = 0;
  redirecionar: boolean = false;

  constructor(
  private solicitacaoService: Solicitacaoservice,
  private funcionarioService: Funcionarioservice,
  private route: ActivatedRoute,
  private clienteService: Clienteservice,
  private router: Router,
) {}

  ngOnInit(): void {
    this.funcionarioLogin = this.funcionarioService.getLogin();
    let id = +this.route.snapshot.params['id'];
    const res = this.solicitacaoService.buscarPorId(id);
    if (res !== undefined) this.solicitacao = res;
    else throw new Error ("Pessoa não encontrada: id = " + id);

    const res2 = this.clienteService.buscarPorId(this.solicitacao.clienteCPF);
    if (res2 !== undefined) this.cliente = res2;
    else throw new Error ("Pessoa não encontrada: id = " + id);

    this.funcionarios = this.funcionarioService.listarTodos();
  }

  efetuarManutencao() {
    this.solicitacao.estado = 'ARRUMADA';
    this.solicitacaoService.atualizar(this.solicitacao);
    this.registrarAlteracao('Manutenção Efetuada', '');
  }

  redirecionarManutencao(id: number) {
    this.alteracao.nomeFuncionarioRedirecionado = this.funcionarioService.buscarPorId(id)!.nome;
    console.log('Redirecionado para: ', id);
    this.alteracao.nomeFuncionario = this.funcionarioService.buscarPorId(this.solicitacao.funcionarioID)!.nome;
    this.alteracao.solicitacaoID = this.solicitacao.ID;
    this.alteracao.data = new Date();
    this.alteracao.tipo = 'Serviço Redirecionado';
    this.alteracao.descricao = '';
    this.solicitacaoService.addAlteracao(this.alteracao);
    this.alteracaoHist = this.solicitacaoService.getAlteracaoByService(this.solicitacao.ID);

    this.solicitacao.funcionarioID = id;
    console.log(`Tipo do id: ${id}: ` + typeof(id));
    
    this.solicitacao.estado = 'REDIRECIONADA';
    this.solicitacaoService.atualizar(this.solicitacao);
    }

  /* Função executada quando Estado: ABERTA, para fazer a proposta do orçamento */
  salvarOrcamento(solicitacao: any): void {
    this.solicitacao.estado = 'ORCADA';
    this.solicitacao.funcionarioID = this.funcionarioService.getLogin();
    this.solicitacaoService.atualizar(solicitacao);
    this.registrarAlteracao('Serviço Orçado', '');
  }

  registrarAlteracao(tipo : string, desc : string): void {
    this.alteracao.solicitacaoID = this.solicitacao.ID;
    this.alteracao.data = new Date();
    this.alteracao.tipo = tipo;
    this.alteracao.descricao = desc;
    this.alteracao.nomeFuncionario = this.funcionarioService.buscarPorId(this.solicitacao.funcionarioID)!.nome;
    this.solicitacaoService.addAlteracao(this.alteracao);
    this.alteracaoHist = this.solicitacaoService.getAlteracaoByService(this.solicitacao.ID);
  }

}
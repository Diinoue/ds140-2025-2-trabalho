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

@Component({
  selector: 'app-rf014-efetuar-manutencao',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './rf014-efetuar-manutencao.html',
  styleUrl: './rf014-efetuar-manutencao.css'
})
export class Rf014EfetuarManutencao implements OnInit{
  solicitacao: Solicitacao = new Solicitacao();
  cliente: Cliente = new Cliente();
  funcionarios: Funcionario[] = [];
  func: string = '';
  mostrarSelecao = false;


constructor(
  private solicitacaoService: Solicitacaoservice,
  private funcionarioService: Funcionarioservice,
  private route: ActivatedRoute,
  private clienteService: Clienteservice,
  private router: Router,
) {}

  ngOnInit(): void {
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
    this.router.navigate(['funcionario']);
  }

  redirecionarManutencao() {
    
  }
}
import { Component, OnInit } from '@angular/core';
import { CommonModule, SlicePipe } from '@angular/common';
import { Solicitacaoservice } from '../../services/solicitacaoservice';
import { Funcionarioservice } from '../../services/funcionarioservice';
import { Solicitacao } from '../../shared/models/solicitacao.model';

@Component({
  selector: 'app-rf019-relatorio',
  standalone: true,
  imports: [CommonModule, SlicePipe],
  templateUrl: './rf019-relatorio.html',
  styleUrls: ['./rf019-relatorio.css']
})
export class Rf019Relatorio implements OnInit {
  solicitacoes: Solicitacao[] = [];
  clientes: string[] = [];
  loginFuncionario: number = 0;
  totalGeral: number = 0; 

  constructor(
    private funcionarioService: Funcionarioservice,
    private solicitacaoService: Solicitacaoservice
  ) {}

  
    ngOnInit(): void {
      this.solicitacaoService.listarTodosOrdenadoData().subscribe({
        next: (data) => {
          this.solicitacoes = data;
          this.calcularTotal();
        },
        error: (err) => console.error('Erro ao carregar solicitações', err)
      });
    }

    listarTodosOrdenado(): void {
      this.solicitacaoService.listarTodosOrdenadoData().subscribe({
        next: (data) => {
          console.log(data);
          this.solicitacoes = data;
        },
        error: (err) => console.error('Erro ao listar solicitações', err)
      });
    }
  

  calcularTotal(): void {
    this.totalGeral = this.solicitacoes
      .filter(s => s.funcionarioId === this.loginFuncionario || s.estado === 'FINALIZADA')
      .reduce((acc, s) => acc + (s.valor || 0), 0);
  }

  imprimirTela(): void {
    window.print();
  }
}

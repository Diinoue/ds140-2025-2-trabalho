import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { Solicitacaoservice } from '../../services/solicitacaoservice';
import { EquipamentoService } from '../../services/equipamento-service';
import { Loginservice } from '../../services/loginservice';

import { Solicitacao } from '../../shared/models/solicitacao.model';
import { Equipamento } from '../../shared/models/equipamento.model';
import { Usuario } from '../../shared/models/usuario.model';

@Component({
  selector: 'app-rf004-solicitacao',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './rf004-solicitacao.html',
  styleUrl:'./rf004-solicitacao.css'
})
export class Rf004SolicitacaoComponent implements OnInit {
  descricaoEquipamento: string = '';
  categoriaEquipamento: Equipamento = new Equipamento();
  descricaoDefeito: string = '';
  categorias: Equipamento[] = [];
  novaSolicitacao: Solicitacao = new Solicitacao();
  login: Usuario = new Usuario();

  constructor(
    private solicitacaoService: Solicitacaoservice,
    private router: Router,
    private equipamentoService: EquipamentoService,
    private loginService: Loginservice
  ) {}

  ngOnInit(): void {
    this.carregarEquipamentos();

    const usuarioLogado = this.loginService.usuarioLogado;
    if (usuarioLogado !== null) {
      this.login = usuarioLogado;
    } else {
      throw new Error('Usuário não encontrado');
    }
  }

  carregarEquipamentos(): void {
    this.equipamentoService.listarTodos().subscribe({
      next: (data) => {
        this.categorias = data;
      },
      error: (err) => {
        console.error('Erro ao carregar equipamentos', err);
      }
    });
  }

  enviarSolicitacao(): void {
    this.novaSolicitacao = {
      nome: this.descricaoEquipamento, 
      descricao: this.descricaoDefeito,
      valor: 0,
      clienteId: this.login.id!,
      orientacoes: 'Aguardando análise do funcionário',
      equipamentoId: this.categoriaEquipamento.id!,
      estado: 'ABERTA',
      ativo: true,
      dataInicio: new Date()  
    };

    console.log('Solicitação enviada:', JSON.stringify(this.novaSolicitacao));

    this.solicitacaoService.inserir(this.novaSolicitacao).subscribe({
      next: () => {
        this.router.navigate(['cliente']);
      },
      error: (err) => {
        console.error('Erro ao enviar solicitação', err);
      }
    });
  }
}

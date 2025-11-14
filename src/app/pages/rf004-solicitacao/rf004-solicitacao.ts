import { Component, OnInit} from '@angular/core';
import { CommonModule, /* DatePipe */ } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Solicitacaoservice } from '../../services/solicitacaoservice';
import { Solicitacao } from '../../shared/models/solicitacao.model';
import { Clienteservice } from '../../services/clienteservice';
import { Cliente } from '../../shared/models/cliente.model';
import { Router } from '@angular/router';
import { EquipamentoService } from '../../services/equipamento-service';
import { Equipamento } from '../../shared/models/equipamento.model';
import { Loginservice } from '../../services/loginservice';
import { Usuario } from '../../shared/models/usuario.model';

@Component({
  selector: 'app-rf004-solicitacao',
  standalone: true,
  imports: [CommonModule, FormsModule, /* DatePipe */],
  templateUrl: './rf004-solicitacao.html',
  styleUrls: ['./rf004-solicitacao.css']
})
export class Rf004SolicitacaoComponent implements OnInit {
  descricaoEquipamento: string = '';
  categoriaEquipamento: string = '';
  descricaoDefeito: string = '';
  categorias: Equipamento[] = [];
  solicitacoes: Solicitacao[] = [];
  novaSolicitacao: Solicitacao = new Solicitacao();
  login: Usuario = new Usuario();
  constructor(
    private solicitacaoService: Solicitacaoservice, 
    private clienteService: Clienteservice,
    private router: Router,
    private equipamentoService: EquipamentoService,
    private loginService: Loginservice,
  ) {
  }

  ngOnInit(): void {
    this.carregarEquipamentos();
    let res = this.loginService.usuarioLogado;
    if (res !== null) this.login = res;
    else throw new Error ("usuario nao encontrado");
  }

  carregarEquipamentos() {
  this.equipamentoService.listarTodos().subscribe(data => {
    this.categorias = data;
  });
}

  enviarSolicitacao(): void {
    this.novaSolicitacao = {
      ID: 0,
      dataHora: new Date(),
      descricaoEquipamento: this.descricaoEquipamento,
      categoriaEquipamento: this.categoriaEquipamento,
      descricaoDefeito: this.descricaoDefeito,
      estado: 'ABERTA',
      valorOrcado: 0,
      clienteNome: this.login.nome,
      clienteID: this.login.id,
      dataDePagamento: new Date(),
      motivo: '',
      descricaoManutencao: '',
      orientacoesCliente: '',
      funcionarioID: 0,
    };

    this.solicitacaoService.inserir(this.novaSolicitacao);

    this.descricaoEquipamento = '';
    this.categoriaEquipamento = '';
    this.descricaoDefeito = '';
    this.router.navigate(['cliente']);
  }
}
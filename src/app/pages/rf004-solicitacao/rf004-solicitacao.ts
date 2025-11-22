import { Component, OnInit} from '@angular/core';
import { CommonModule, /* DatePipe */ } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Solicitacaoservice } from '../../services/solicitacaoservice';
import { Solicitacao } from '../../shared/models/solicitacao.model';
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
  categoriaEquipamento: Equipamento = new Equipamento;
  descricaoDefeito: string = '';
  categorias: Equipamento[] = [];
  solicitacoes: Solicitacao[] = [];
  novaSolicitacao: Solicitacao = new Solicitacao();
  login: Usuario = new Usuario();
  constructor(
    private solicitacaoService: Solicitacaoservice, 
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
  const agora = new Date();

  this.novaSolicitacao = {
    id: 0,
    dataHora: agora,
    descricaoEquipamento: this.descricaoEquipamento,
    categoriaEquipamento: this.categoriaEquipamento.nome,
    descricaoDefeito: this.descricaoDefeito,
    estado: 'ABERTA',
    valorOrcado: 0,
    clienteNome: this.login.nome,
    clienteId: this.login.id,
    dataDePagamento: agora,
    motivo: '',
    descricaoManutencao: '',
    orientacoesCliente: '',
    funcionarioId: 0
  };
    console.log(JSON.stringify(this.novaSolicitacao));
    this.solicitacaoService.inserir(this.novaSolicitacao).subscribe(response => {
      this.router.navigate(['cliente']);
    });
  }
}
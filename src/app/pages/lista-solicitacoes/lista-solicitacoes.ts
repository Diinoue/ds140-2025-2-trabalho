import { Component } from '@angular/core';
import { Solicitacaoservice } from '../../services/solicitacaoservice';
import { SlicePipe } from '@angular/common';
import { Solicitacao } from '../../shared/models/solicitacao.model';
import { DataptbrPipe } from '../../shared/pipes/dataptbr-pipe';
import { Loginservice } from '../../services/loginservice';
import { Usuario } from '../../shared/models/usuario.model';


@Component({
  selector: 'app-rf011-pagina-inicial-funcionario',
  imports: [ SlicePipe, DataptbrPipe],
  templateUrl: './lista-solicitacoes.html',
  styleUrl: './lista-solicitacoes.css'
})
export class ListaSolicitacoes {
  solicitacoes: Solicitacao[] = [];
  clientes: string[] = [];
  loginFuncionario: Usuario = new Usuario();

constructor (
  private solicitacaoService: Solicitacaoservice, 
  private loginService: Loginservice, 
){
}

ngOnInit(): void {
  this.carregarSolicitacoes();
  this.loginService.usuario$.subscribe(usuario => {
      this.loginFuncionario = usuario!;
    }); 
}

carregarSolicitacoes() {
  console.log('AAAAAAAAAAAAAA');
  this.solicitacaoService.listarTodas().subscribe(data => {
    this.solicitacoes = data;
    console.log(data);
    console.log('Funcionário logado:', this.loginFuncionario.id);
  });
} 
}
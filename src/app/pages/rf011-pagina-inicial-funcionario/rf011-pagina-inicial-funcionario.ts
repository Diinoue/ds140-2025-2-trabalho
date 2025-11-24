import { Component } from '@angular/core';
import { Solicitacaoservice } from '../../services/solicitacaoservice';
import { DatePipe } from '@angular/common';
import { Funcionarioservice } from '../../services/funcionarioservice';
import { SlicePipe } from '@angular/common';
import { Solicitacao } from '../../shared/models/solicitacao.model';
import { Clienteservice } from '../../services/clienteservice';
import { Cliente } from '../../shared/models/cliente.model';
import { ActivatedRoute } from '@angular/router';
import { Loginservice } from '../../services/loginservice';
import { Usuario } from '../../shared/models/usuario.model';
import { DataptbrPipe } from '../../shared/pipes/dataptbr-pipe';

@Component({
  selector: 'app-rf011-pagina-inicial-funcionario',
  imports: [DataptbrPipe, SlicePipe],
  templateUrl: './rf011-pagina-inicial-funcionario.html',
  styleUrl: './rf011-pagina-inicial-funcionario.css'
})
export class Rf011PaginaInicialFuncionario {
  solicitacoes: Solicitacao[] = [];
  clientes: string[] = [];
  loginFuncionario: Usuario = new Usuario();


constructor (
  private solicitacaoService: Solicitacaoservice,
  private loginService: Loginservice,
){}

ngOnInit(): void {
  let res = this.loginService.usuarioLogado;
  if (res !== null) this.loginFuncionario = res;
  else throw new Error ("usuario nao encontrado");
  
  this.solicitacaoService.buscarListaPorFuncionario(this.loginFuncionario.id!).subscribe(data => {
      this.solicitacoes = data;
    });
}


}
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Rf001Autocadastro } from './rf001-autocadastro/rf001-autocadastro';
import { Rf002Login } from "./rf002-login/rf002-login";
import { Rf003Pagcliente } from "./components/rf003-pagcliente/rf003-pagcliente";
import { Rf004SolicitacaoComponent } from './rf004-solicitacao/rf004-solicitacao';
import { Rf005Mostrarorcamento } from './components/rf005-mostrarorcamento/rf005-mostrarorcamento';
import { Rf005MostrarOrcamentoCliente } from "./rf005-mostrar-orcamento-cliente/rf005-mostrar-orcamento-cliente";
import { RF008VisualizarServico } from './rf008-visualizar-servico/rf008-visualizar-servico';
import { Rf010PagarServico } from './rf010-pagar-servico/rf010-pagar-servico';
import { Rf013VisualizarSolicitacoes } from './rf013-visualizar-solicitacoes/rf013-visualizar-solicitacoes';
import { Rf014EfetuarManutencao } from './rf014-efetuar-manutencao/rf014-efetuar-manutencao';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    Rf001Autocadastro,
    Rf002Login,
    Rf003Pagcliente,
    Rf004SolicitacaoComponent,
    Rf005Mostrarorcamento,
    Rf005MostrarOrcamentoCliente,
    RF008VisualizarServico,
    Rf010PagarServico,
    Rf013VisualizarSolicitacoes,
    Rf014EfetuarManutencao,
    RouterOutlet,  
    RouterLink,    
    CommonModule  
],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  title = 'ds140-2025-2-trabalho';
}

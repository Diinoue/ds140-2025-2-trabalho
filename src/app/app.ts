import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Rf004SolicitacaoComponent } from './rf004-solicitacao/rf004-solicitacao';
import { Rf001Autocadastro } from './rf001-autocadastro/rf001-autocadastro';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Rf002Login } from "./rf002-login/rf002-login";
import { Rf003Pagcliente } from "./components/rf003-pagcliente/rf003-pagcliente";
import { Rf005Mostrarorcamento } from './components/rf005-mostrarorcamento/rf005-mostrarorcamento';
import { Rf005MostrarOrcamentoCliente } from "./rf005-mostrar-orcamento-cliente/rf005-mostrar-orcamento-cliente";
import { RF008VisualizarServico } from './rf008-visualizar-servico/rf008-visualizar-servico';
import { Rf010PagarServico } from './rf010-pagar-servico/rf010-pagar-servico';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    Rf004SolicitacaoComponent,
    ReactiveFormsModule,
    Rf001Autocadastro,
    FormsModule,
    Rf002Login,
    Rf003Pagcliente,
    Rf005Mostrarorcamento,
    Rf005MostrarOrcamentoCliente,
    RF008VisualizarServico,
    Rf010PagarServico
],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  title = 'ds140-2025-2-trabalho';
}

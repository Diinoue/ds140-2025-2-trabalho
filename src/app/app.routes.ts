import { Routes } from '@angular/router';
import { Rf001Autocadastro } from './rf001-autocadastro/rf001-autocadastro';
import { Rf002Login } from './rf002-login/rf002-login';
import { Rf003Pagcliente } from './components/rf003-pagcliente/rf003-pagcliente';
import { Rf004SolicitacaoComponent } from './rf004-solicitacao/rf004-solicitacao';
import { Rf005MostrarOrcamentoCliente } from './rf005-mostrar-orcamento-cliente/rf005-mostrar-orcamento-cliente';
import { RF008VisualizarServico } from './rf008-visualizar-servico/rf008-visualizar-servico';

export const routes: Routes = 
[
    {path: 'autocadastro', component:Rf001Autocadastro},
    {path: 'login', component: Rf002Login },
    {path: 'cliente', component: Rf003Pagcliente },
    {path: 'solicitacao', component: Rf004SolicitacaoComponent },
    {path: 'orcamentos', component: Rf005MostrarOrcamentoCliente },
    {path: 'servicos', component: RF008VisualizarServico },

    {path: '', redirectTo: '/login', pathMatch: 'full' },

]
import { Routes } from '@angular/router';
import { Rf001Autocadastro } from './rf001-autocadastro/rf001-autocadastro';
import { Rf002Login } from './rf002-login/rf002-login';
import { Rf003Pagcliente } from './components/rf003-pagcliente/rf003-pagcliente';
import { Rf004SolicitacaoComponent } from './rf004-solicitacao/rf004-solicitacao';
import { Rf005MostrarOrcamentoCliente } from './rf005-mostrar-orcamento-cliente/rf005-mostrar-orcamento-cliente';
import { Rf005Mostrarorcamento } from './components/rf005-mostrarorcamento/rf005-mostrarorcamento';
import { RF008VisualizarServico } from './rf008-visualizar-servico/rf008-visualizar-servico';
import { Rf010PagarServico } from './rf010-pagar-servico/rf010-pagar-servico';
import { Rf013VisualizarSolicitacoes } from './rf013-visualizar-solicitacoes/rf013-visualizar-solicitacoes';
import { Rf014EfetuarManutencao } from './rf014-efetuar-manutencao/rf014-efetuar-manutencao';
import { RF018CRUDFuncionarios } from './rf018-crud-funcionarios/rf018-crud-funcionarios';
export const routes: Routes = 
[
    {path: 'autocadastro', component:Rf001Autocadastro},
    {path: 'login', component: Rf002Login },
    {path: 'cliente', component: Rf003Pagcliente },
    {path: 'solicitacao', component: Rf004SolicitacaoComponent },
    {path: 'orcamentos', component: Rf005MostrarOrcamentoCliente },
    {path: 'servicos', component: RF008VisualizarServico },
    {path: 'Mostrarorcamento', component: Rf005Mostrarorcamento },
    {path: 'PagarServico/:id', component: Rf010PagarServico },
    {path: 'VisualizarSolicitacoes', component: Rf013VisualizarSolicitacoes },
    {path: 'EfetuarManutencao', component: Rf014EfetuarManutencao},
    {path: 'CRUDFuncionario',component: RF018CRUDFuncionarios},
    {path: '', redirectTo: '/login', pathMatch: 'full' },

]
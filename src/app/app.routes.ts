import { Routes } from '@angular/router';
import { Rf001Autocadastro } from './pages/rf001-autocadastro/rf001-autocadastro';
import { Rf002Login } from './pages/rf002-login/rf002-login';
import { Rf003Pagcliente } from './pages/rf003-pagcliente/rf003-pagcliente';
import { Rf004SolicitacaoComponent } from './pages/rf004-solicitacao/rf004-solicitacao';
import { Rf014EfetuarManutencao } from './pages/rf014-efetuar-manutencao/rf014-efetuar-manutencao';
import { visualizarServicoCliente } from './pages/visualizar-servico-cliente/visualizar-servico-cliente';
import { Rf011PaginaInicialFuncionario } from './pages/rf011-pagina-inicial-funcionario/rf011-pagina-inicial-funcionario';
import { CadastroFuncionarios } from './pages/cadastro-funcionarios/cadastro-funcionarios';

export const routes: Routes = 
[
    {path: 'cadastro', component:Rf001Autocadastro},
    {path: 'login', component: Rf002Login },
    {path: 'cliente', component: Rf003Pagcliente },
    {path: 'solicitacao', component: Rf004SolicitacaoComponent },
    {path: 'visualizar-servico/:id', component: visualizarServicoCliente },
    {path: 'EfetuarManutencao/:id', component: Rf014EfetuarManutencao},
    {path: 'funcionario', component: Rf011PaginaInicialFuncionario},
    {path: '', redirectTo: '/login', pathMatch: 'full' },

    /* CAMINHOS DEBUG, REMOVER DEPOIS */
    {path: 'cadastro-funcionario', component: CadastroFuncionarios},
]
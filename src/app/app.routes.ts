import { Routes } from '@angular/router';
import { authGuard } from './auth-guard';
import { Rf001Autocadastro } from './pages/rf001-autocadastro/rf001-autocadastro';
import { Rf002Login } from './pages/rf002-login/rf002-login';
import { Rf003Pagcliente } from './pages/rf003-pagcliente/rf003-pagcliente';
import { Rf004SolicitacaoComponent } from './pages/rf004-solicitacao/rf004-solicitacao';
import { visualizarServicoCliente } from './pages/visualizar-servico-cliente/visualizar-servico-cliente';
import { VisualizarServicoFuncionario } from './pages/visualizar-servico-funcionario/visualizar-servico-funcionario';
import { Rf011PaginaInicialFuncionario } from './pages/rf011-pagina-inicial-funcionario/rf011-pagina-inicial-funcionario';
import { CadastroFuncionarios } from './pages/cadastro-funcionarios/cadastro-funcionarios';
import { CrudFuncionario } from './pages/crud-funcionario/crud-funcionario';
import { ListaSolicitacoes } from './pages/lista-solicitacoes/lista-solicitacoes';
import { VisualizarFuncionario } from './pages/visualizar-funcionario/visualizar-funcionario';
import { CrudEquipamentos } from './pages/crud-equipamentos/crud-equipamentos';
import { EditarFuncionario } from './pages/editar-funcionario/editar-funcionario';
import { CadastroEquipamentos } from './pages/cadastro-equipamentos/cadastro-equipamentos';
import  { Rf019Relatorio } from './pages/rf019-relatorio/rf019-relatorio';
import { EditarEquipamento } from './pages/editar-equipamento/editar-equipamento';

export const routes: Routes = 
[
    {path: 'cadastro', component:Rf001Autocadastro},
    {path: 'login', component: Rf002Login },
    {path: 'cliente', component: Rf003Pagcliente, canActivate: [authGuard],
    data: { role: 'FUNC,CLIENTE' } },
    {path: 'solicitacao', component: Rf004SolicitacaoComponent,
    canActivate: [authGuard],
    data: { role: 'FUNC,CLIENTE' }
     },
    {path: 'visualizar-servico/:id', component: visualizarServicoCliente,
    canActivate: [authGuard],
    data: { role: 'FUNC' } },
    {path:'crudfuncionario',component: CrudFuncionario,canActivate: [authGuard],
    data: { role: 'FUNC' } },
    /* ROTAS FUNCIONARIO */
    {path: 'funcionario', component: Rf011PaginaInicialFuncionario,canActivate: [authGuard],
    data: { role: 'FUNC' } },
    {path: 'funcionario/visualizar-servico/:id', component: VisualizarServicoFuncionario,canActivate: [authGuard],
    data: { role: 'FUNC' } },
    {path: 'funcionario/lista-solicitacoes', component: ListaSolicitacoes ,canActivate: [authGuard],
    data: { role: 'FUNC' } },
    {path: '', redirectTo: '/login', pathMatch: 'full' },
    {path: 'visualizar-funcionario/:id',component: VisualizarFuncionario ,canActivate: [authGuard],
    data: { role: 'FUNC' } },
    {path: 'editar-funcionario/:id',component: EditarFuncionario ,canActivate: [authGuard],
    data: { role: 'FUNC' } },
    {path: 'lista-funcionarios', component:CrudFuncionario ,canActivate: [authGuard],
    data: { role: 'FUNC' } },
    
    /* ROTAS EQUIPAMENTO */
    {path: 'cadastro-equipamentos', component:CadastroEquipamentos ,canActivate: [authGuard],
    data: { role: 'FUNC' } },
    {path: 'lista-equipamentos', component:CrudEquipamentos ,canActivate: [authGuard],
    data: { role: 'FUNC' } },
    {path: 'editar-equipamento:nome', component:EditarEquipamento ,canActivate: [authGuard],
    data: { role: 'FUNC' } },
    {path:'relatorio',component:Rf019Relatorio},
    
    /* CAMINHOS DEBUG, REMOVER DEPOIS */
    {path: 'cadastro-funcionario', component: CadastroFuncionarios  ,canActivate: [authGuard],
    data: { role: 'FUNC' } },
]
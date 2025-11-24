import { Routes } from '@angular/router';
import { AuthGuard } from './auth/auth-guard';
import { Rf001Autocadastro } from './pages/rf001-autocadastro/rf001-autocadastro';
import { Rf002Login } from './pages/rf002-login/rf002-login';
import { Rf003Pagcliente } from './pages/rf003-pagcliente/rf003-pagcliente';
import { Rf004SolicitacaoComponent } from './pages/rf004-solicitacao/rf004-solicitacao';
import { VisualizarServicoCliente} from './pages/visualizar-servico-cliente/visualizar-servico-cliente';
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
    {path: 'cliente', component: Rf003Pagcliente, canActivate: [AuthGuard],
    data: { role: 'funcionario,cliente' } },
    {path: 'solicitacao', component: Rf004SolicitacaoComponent,
    canActivate: [AuthGuard],
    data: { role: 'funcionario,cliente' }
     },
    {path: 'visualizar-servico/:id', component: VisualizarServicoCliente,
    canActivate: [AuthGuard],
    data: { role: 'funcionario,cliente' } },
    {path:'crudfuncionario',component: CrudFuncionario,},
    /* ROTAS FUNCIONARIO */
    {path: 'funcionario', component: Rf011PaginaInicialFuncionario,canActivate: [AuthGuard],
    data: { role: 'funcionario' } },
    {path: 'funcionario/visualizar-servico/:id', component: VisualizarServicoFuncionario,canActivate: [AuthGuard],
    data: { role: 'funcionario' } },
    {path: 'funcionario/lista-solicitacoes', component: ListaSolicitacoes ,canActivate: [AuthGuard],
    data: { role: 'funcionario' } },
    {path: '', redirectTo: '/login', pathMatch: 'full' },
    {path: 'visualizar-funcionario/:id',component: VisualizarFuncionario ,canActivate: [AuthGuard],
    data: { role: 'funcionario' } },
    {path: 'editar-funcionario/:id',component: EditarFuncionario ,},
    {path: 'lista-funcionarios', component:CrudFuncionario },
    
    /* ROTAS EQUIPAMENTO */
    {path: 'cadastro-equipamentos', component:CadastroEquipamentos ,canActivate: [AuthGuard],
    data: { role: 'funcionario' } },
    {path: 'lista-equipamentos', component:CrudEquipamentos ,canActivate: [AuthGuard],
    data: { role: 'funcionario' } },
    {path: 'editar-equipamento:nome', component:EditarEquipamento ,canActivate: [AuthGuard],
    data: { role: 'funcionario' } },
    {path:'relatorio',component:Rf019Relatorio ,canActivate: [AuthGuard],
    data: { role: 'funcionario' } },
    
    /* CAMINHOS DEBUG, REMOVER DEPOIS */
    {path: 'cadastro-funcionario', component: CadastroFuncionarios , },
]
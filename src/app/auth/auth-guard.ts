import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Funcionarioservice } from '../services/funcionarioservice';
import { Clienteservice } from '../services/clienteservice';
import { Funcionario } from '../shared/models/funcionario.model';
import { Cliente } from '../shared/models/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private funcionarioService: Funcionarioservice,
    private clienteService: Clienteservice,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {

    const idFuncionario = this.funcionarioService.getLogin();
    const idCliente = this.clienteService.getLogin();

    const funcionarios: Funcionario[] = this.funcionarioService.listarTodos();
    const clientes: Cliente[] = this.clienteService.listarTodos();

    const funcionarioLogado = idFuncionario
      ? funcionarios.find(f => f.id == idFuncionario)
      : undefined;

    const clienteLogado = idCliente
      ? clientes.find(c => c.cpf == idCliente)
      : undefined;

    if (!funcionarioLogado && !clienteLogado) {
      console.warn('Nenhum usuario achado');
      this.redirecionarParaLogin(state.url);
      return false;
    }

    let cargoUsuario = '';
    if (funcionarioLogado) {
      cargoUsuario = 'FUNC';
      console.log('logado como FUNCIONÁRIO:', funcionarioLogado.nome);
    } else if (clienteLogado) {
      cargoUsuario = 'CLIENTE';
      console.log('logado como CLIENTE:', clienteLogado.nome);
    }

    const roleData = route.data['role'];
    const rolesPermitidas = typeof roleData === 'string'
      ? roleData.split(',').map(r => r.trim())
      : [];

    if (rolesPermitidas.length > 0 && !rolesPermitidas.includes(cargoUsuario)) {
      console.warn(`Acesso negado: ${cargoUsuario}não entra  ${state.url}`);
      this.redirecionarParaLogin();
      return false;
    }

    return true;
  }

  private redirecionarParaLogin(urlDestino?: string): void {
    this.router.navigate(['/login'], {
      queryParams: { redirectTo: urlDestino }
    });
  }
}

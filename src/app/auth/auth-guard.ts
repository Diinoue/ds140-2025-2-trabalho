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
import { Loginservice } from '../services/loginservice';
import { Usuario } from '../shared/models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
usuarioLogado: Usuario = new Usuario()

  constructor(
    private loginService: Loginservice,
    private router: Router,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {

    const res = this.loginService.usuarioLogado;
    if (res !== null) this.usuarioLogado = res;

    if (this.usuarioLogado === null) {
      console.warn('Nenhum usuario achado');
      this.redirecionarParaLogin(state.url);
      return false;
    }

    const roleData = route.data['role'];
    const rolesPermitidas = typeof roleData === 'string'
      ? roleData.split(',').map(r => r.trim())
      : [];

    if (rolesPermitidas.length > 0 && !rolesPermitidas.includes(this.usuarioLogado.perfil)) {
      console.warn(`Acesso negado: ${this.usuarioLogado.perfil} não entra  ${state.url}`);
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

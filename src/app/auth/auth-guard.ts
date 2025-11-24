import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Loginservice } from '../services/loginservice';
import { Usuario } from '../shared/models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate 
{

  usuarioLogado: Usuario | null = null;

  constructor
  (
    private loginService: Loginservice,
    private router: Router,
  ) {}

  canActivate
  (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean 
  {

    const res = this.loginService.usuarioLogado;
    if (res) this.usuarioLogado = res;

    if (!this.usuarioLogado) 
    {
      console.warn('Nenhum usuário encontrado');
      this.redirecionarParaLogin(state.url);
      return false;
    }

    if (this.usuarioLogado.ativo === false) 
    {
      console.warn('Usuário desativado');
      this.redirecionarParaLogin(state.url);
      return false;
    }

    const roleData = route.data['role'];
    const rolesPermitidas = Array.isArray(roleData)? roleData: typeof roleData === 'string' ? roleData.split(',').map(r => r.trim()): [];

    if (rolesPermitidas.length > 0 && !rolesPermitidas.includes(this.usuarioLogado.perfil)) {console.warn(`Acesso negado: perfil ${this.usuarioLogado.perfil} não tem acesso a ${state.url}`);this.redirecionarParaLogin();return false;
    }

    return true;
  }

  private redirecionarParaLogin(urlDestino?: string): void 
  {
    this.router.navigate(['/login'], {queryParams: { redirectTo: urlDestino } });
  }
}

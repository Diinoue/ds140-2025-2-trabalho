import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Funcionarioservice } from '../services/funcionarioservice';
import { Funcionario } from '../shared/models/funcionario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private funcionarioService: Funcionarioservice,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {

    const idLogado = this.funcionarioService.getLogin();

    if (!idLogado) {
      console.warn(' Usuário não autenticado!');
      this.redirecionarParaLogin(state.url);
      return false;
    }

    const funcionarios: Funcionario[] = this.funcionarioService.listarTodos();
    const funcionarioLogado = funcionarios.find(f => f.id == idLogado);

    if (!funcionarioLogado) {
      console.warn('Usuário não encontrado');
      this.redirecionarParaLogin(state.url);
      return false;
    }

    const rolesPermitidas = (route.data['role'] as string | undefined)
      ?.split(',')
      .map(r => r.trim()) || [];

 
    return true;
  }

  private redirecionarParaLogin(urlDestino?: string): void {
    this.router.navigate(['/login'], {
      queryParams: { redirectTo: urlDestino }
    });
  }
}

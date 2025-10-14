import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
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

    const funcionarios: Funcionario[] = this.funcionarioService.listarTodos();
    const idLogado = this.funcionarioService.getLogin();

    if (!idLogado) {
      console.warn(' Usuário não autenticado!');
      this.router.navigate(['/login']);
      return false;
    }

    const funcionarioLogado = funcionarios.find(f => f.id == idLogado);

    if (!funcionarioLogado) {
      console.warn(' Usuario não achado');
      this.router.navigate(['/login']);
      return false;
    }

    const rolesPermitidas = route.data['role']?.split(',') || [];
    if (rolesPermitidas.length > 0 && !rolesPermitidas.includes(funcionarioLogado.cargo)) {
      console.warn('ERRO:', funcionarioLogado.cargo);
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}
import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Usuario } from '../shared/models/usuario.model';
import { Login } from '../shared/models/login.model';
import { HttpClient } from '@angular/common/http';

/*
Importação de Observable, of e dos modelos Usuario, Login é feito
pra poder retornar um Observable com os dados de login
*/

const LS_CHAVE: string = "usuarioLogado";

@Injectable({providedIn: 'root'})

/* 
SLIDE 790
SERÁ TROCADO POR UMA CONSULTA AOS USUÁRIOS CADASTRADOS EM UMA API REST;
*/
export class Loginservice {
  private http = inject(HttpClient);
  // ^ O serviço agr consegue requests HTTP pelo this.http

  // Getter de usuário
  public get usuarioLogado(): Usuario | null {
    let usu = localStorage[LS_CHAVE];
    return (usu ? JSON.parse(localStorage[LS_CHAVE]): null);
  }

  public set usuarioLogado(usuario: Usuario) {
    localStorage[LS_CHAVE] = JSON.stringify(usuario);
  }

  //Equivalente ao logout do slide do razer (779)
  clearLogin(): void{
    localStorage[LS_CHAVE] = null;
  }

  //Será trocado por uma consulta aos usuários cadastrados em uma API REST
  
  
  login (login: Login): Observable<Usuario | null> {
    let usu = new Usuario(1, login.login,
                          login.login, login.senha, "FUNC");
    // Neste caso, este IF abaixo estava ADMIN, ou seja, diferente de FUNC
    // Pode ser que dê problemas no futuro
    if (login.login == login.senha) {
      if (login.login == "func") {
        usu.perfil = "FUNC";
      }
      else if (login.login == "cliente") {
        usu.perfil = "CLIENTE";
      }
      return of (usu);
    }
    else {
      return of (null);
    }
  }
  
}

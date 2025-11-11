import { inject, Injectable } from '@angular/core';
import { Observable, of, throwError} from 'rxjs';
import { Usuario } from '../shared/models/usuario.model';
import {map, catchError, tap } from 'rxjs/operators';
import { Login } from '../shared/models/login.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { fromPromise } from 'rxjs/internal/observable/innerFrom';

/* 
  INCOMPLETO
    Fazer 
*/

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

  private BASE_URL: string = 'http://localhost:8080/login'
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

  login(login: Login): Observable<Usuario | null> {
    return this.http.post<Usuario>(this.BASE_URL, login, { observe: 'response' })
    .pipe(
      map(resp => {
        //Se back retornar um usuario no body, OK (200)
        if (resp.status === 200 && resp.body) {
          this.usuarioLogado = resp.body;
          return resp.body;
        } else {
          return null;
        }
      }),
      catchError((err: HttpErrorResponse) => {
        //Conversão de erro em um Observable<Usuario|null> ou rethrow
        if(err.status === 401) {
          return of(null);
        } else {
          console.error('Erro no login', err);
          return throwError(() => err);
        }
      })


      )
  }

  //Será trocado por uma consulta aos usuários cadastrados em uma API REST
    /* login (login: Login): Observable<Usuario | null> {
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
  } */
  
}

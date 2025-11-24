import { inject, Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Usuario } from '../shared/models/usuario.model';
import { map, catchError } from 'rxjs/operators';
import { Login } from '../shared/models/login.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

const LS_CHAVE: string = "usuarioLogado";

@Injectable({ providedIn: 'root' })
export class Loginservice {

  private http = inject(HttpClient);
  private BASE_URL: string = 'http://localhost:8080/login';

  public get usuarioLogado(): Usuario | null {
    const usu = localStorage.getItem(LS_CHAVE);
    return usu ? JSON.parse(usu) : null;
  }

  public set usuarioLogado(usuario: Usuario | null) {
    if (usuario) {
      localStorage.setItem(LS_CHAVE, JSON.stringify(usuario));
    } else {
      localStorage.removeItem(LS_CHAVE);
    }
  }

  clearLogin(): void {
    localStorage.removeItem(LS_CHAVE);
  }

  login(login: Login): Observable<Usuario | null> {
    return this.http.post<Usuario>(this.BASE_URL, login, { observe: 'response' })
      .pipe(
        map(resp => {
          if (resp.status === 200 && resp.body) {
            const usuario = new Usuario();
            usuario.id = resp.body.id;
            usuario.email = resp.body.email;
            usuario.nome = resp.body.nome;
            usuario.perfil = resp.body.perfil?.toUpperCase() ?? '';
            usuario.ativo = resp.body.ativo;

            this.usuarioLogado = usuario;
            return usuario;
          } else {
            return null;
          }
        }),
        catchError((err: HttpErrorResponse) => {
          if (err.status === 401) {
            return of(null);
          } else {
            console.error('Erro no login', err);
            return throwError(() => err);
          }
        })
      );
  }
}

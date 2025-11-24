import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError} from 'rxjs';
import { Usuario } from '../shared/models/usuario.model';
import { map, catchError } from 'rxjs/operators';
import { Login } from '../shared/models/login.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

const LS_CHAVE: string = "usuarioLogado";

@Injectable({ providedIn: 'root' })
export class Loginservice {

  private usuarioSubject = new BehaviorSubject<Usuario | null>(this.getLogin());
  usuario$ = this.usuarioSubject.asObservable();
  
  public user = new Usuario();

  private http = inject(HttpClient);

  private BASE_URL: string = 'http://localhost:8080/login'
  // Getter de usuário
  private getLogin(): Usuario | null {
    const data = localStorage.getItem('usuarioLogado');
    return data ? JSON.parse(data) : null;
  }

  public get usuarioLogado() {
    const data = localStorage.getItem('usuarioLogado');
    return data ? JSON.parse(data) : null;
  }

  public set usuarioLogado(usuario: Usuario | null) {
    if (usuario) {
      localStorage.setItem(LS_CHAVE, JSON.stringify(usuario));
    } else {
      localStorage.removeItem(LS_CHAVE);
    }
  }

  //Equivalente ao logout do slide do razer (779)
  clearLogin(): void{
    localStorage[LS_CHAVE] = null;
    this.usuarioSubject.next(null);
  }

  login(login: Login): Observable<Usuario | null> {
    return this.http.post<Usuario>(this.BASE_URL, login, { observe: 'response' })
    .pipe(
      map(resp => {
        //Se back retornar um usuario no body, OK (200)
        if (resp.status === 200 && resp.body) {
          this.user.id = resp.body.id;
          this.user.email = resp.body.email;
          this.user.nome = resp.body.nome;
          this.user.perfil = resp.body.perfil;
          this.user.senha = resp.body.senha;
          this.usuarioLogado = this.user;
          console.log(this.user.perfil);
          this.usuarioSubject.next(this.user);
          return this.user;
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
}

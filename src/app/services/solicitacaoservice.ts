import { Injectable } from '@angular/core';
import { Solicitacao } from '../shared/models/solicitacao.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class Solicitacaoservice {

  private apiUrl = 'http://localhost:8080/solicitacoes';

  constructor(private http: HttpClient) {}

  listarTodas(): Observable<Solicitacao[]> {
    return this.http.get<Solicitacao[]>(this.apiUrl);
  }

  inserir(solicitacao: Solicitacao): Observable<Solicitacao> {
    return this.http.post<Solicitacao>(this.apiUrl, solicitacao);
  }

  buscarPorId(id: number): Observable<Solicitacao> {
    return this.http.get<Solicitacao>(`${this.apiUrl}/${id}`);
  }

  buscarListaPorCliente(id: number): Observable<Solicitacao[]> {
    return this.http.get<Solicitacao[]>(`${this.apiUrl}/cliente/${id}`);
  }

  buscarListaPorFuncionario(id: number): Observable<Solicitacao[]> {
    return this.http.get<Solicitacao[]>(`${this.apiUrl}/funcionario/${id}`);
  }

  atualizar(solicitacao: Solicitacao): Observable<Solicitacao> {
    return this.http.put<Solicitacao>(`${this.apiUrl}/${solicitacao.id}`, solicitacao);
  }
  
  remover(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // 🔎 Métodos auxiliares para ordenação e filtragem

  listarTodosOrdenadoData(): Observable<Solicitacao[]> {
    return this.listarTodas().pipe(
      map(solicitacoes =>
        solicitacoes.sort(
          (a, b) =>
            new Date(a.dataInicio!).getTime() - new Date(b.dataInicio!).getTime()
        )
      )
    );
  }

  listarHoje(): Observable<Solicitacao[]> {
    const hoje = new Date();
    return this.listarTodas().pipe(
      map(solicitacoes =>
        solicitacoes.filter(solicitacao => {
          const data = new Date(solicitacao.dataInicio!);
          return (
            data.getDate() === hoje.getDate() &&
            data.getMonth() === hoje.getMonth() &&
            data.getFullYear() === hoje.getFullYear()
          );
        })
      )
    );
  }

  listarPeriodo(min: Date, max: Date): Observable<Solicitacao[]> {
    return this.listarTodas().pipe(
      map(solicitacoes =>
        solicitacoes.filter(solicitacao => {
          const data = new Date(solicitacao.dataInicio!);
          return data >= min && data <= max;
        })
      )
    );
  }
}

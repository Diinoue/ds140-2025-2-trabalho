import { Injectable } from '@angular/core';
import { Solicitacao } from '../shared/models/solicitacao.model';
import { AlteracaoLog } from '../shared/models/alteracao-log';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const LS_CHAVE = "solicitacoes";

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

  buscarListaPorCliente(id: number) : Observable<Solicitacao[]> {
    return this.http.get<Solicitacao[]>(`${this.apiUrl}/cliente/${id}`);
  }

  buscarListaPorFuncionario(id: number) : Observable<Solicitacao[]> {
    return this.http.get<Solicitacao[]>(`${this.apiUrl}/funcionario/${id}`);
  }

  atualizar(solicitacao: Solicitacao): Observable<Solicitacao> {
    return this.http.put<Solicitacao>(`${this.apiUrl}/${solicitacao.ID}`, solicitacao);
  }
  
  remover(id: number): Observable<Solicitacao> {
    return this.http.delete<Solicitacao>(`${this.apiUrl}/${id}`);
  }

/* 
  ORDENA A Solicitacao[] POR DATA/HORA, USADO POR: rf003-pagcliente, lista-solicitacoes
  listarTodosOrdenadoData(): Solicitacao[]{
    const solicitacoes = this.listarTodos();
    return solicitacoes.sort(
      (a, b) => new Date(a.dataHora).getTime() - new Date(b.dataHora).getTime()
    );
   Pega as solicitações por funcionário  
  }

  listarHoje(): Solicitacao[] {
    const hoje = new Date();
    return this.listarTodos().filter(solicitacao => {
      const data = solicitacao.dataHora;
      return (
        data.getDate() === hoje.getDate() &&
        data.getMonth() === hoje.getMonth() &&
        data.getFullYear() === hoje.getFullYear()
      );
    });
  }

  listarPeriodo(min: Date, max: Date): Solicitacao[] {
    const hoje = new Date();
    return this.listarTodos().filter(solicitacao => {
    const data = solicitacao.dataHora;
    return data >= min && data <= max;
  });
}
*/

}

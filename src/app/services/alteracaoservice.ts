import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Historico } from '../shared/models/historico';

@Injectable({
  providedIn: 'root'
})
export class Alteracaoservice {
  
private apiUrl = 'http://localhost:8080/alteracoes';

  constructor(private http: HttpClient) {}

  listarTodas(): Observable<Historico[]> {
    return this.http.get<Historico[]>(this.apiUrl);
  }

  inserir(alteracao: Historico): Observable<Historico> {
    return this.http.post<Historico>(this.apiUrl, alteracao);
  }

  buscarPorId(id: number): Observable<Historico[]> {
    return this.http.get<Historico[]>(`${this.apiUrl}${id}`);
  }
  
  buscarPorSolicitacao(id: number): Observable<Historico[]> {
    return this.http.get<Historico[]>(`${this.apiUrl}/solicitacoes/${id}`);
  }

  atualizar(alteracao: Historico): Observable<Historico> {
    return this.http.put<Historico>(`${this.apiUrl}/${alteracao.id}`, alteracao);
  }

  remover(id: number): Observable<Historico> {
    return this.http.delete<Historico>(`${this.apiUrl}/${id}`);
  }
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Historico } from '../shared/models/historico';

@Injectable({
  providedIn: 'root'
})
export class HistoricoService {

  private apiUrl = 'http://localhost:8080/historicos';

  constructor(private http: HttpClient) {}

  listarTodos(): Observable<Historico[]> 
  {
    return this.http.get<Historico[]>(this.apiUrl);
  }

  inserir(historico: Historico): Observable<Historico> 
  {
    return this.http.post<Historico>(this.apiUrl, historico);
  }

  buscarPorId(id: number): Observable<Historico> 
  {
    return this.http.get<Historico>(`${this.apiUrl}/${id}`);
  }

  buscarPorSolicitacao(id: number): Observable<Historico[]> 
  {
    return this.http.get<Historico[]>(`${this.apiUrl}/solicitacao/${id}`);
  }

  buscarPorFuncionario(id: number): Observable<Historico[]> 
  {
    return this.http.get<Historico[]>(`${this.apiUrl}/funcionario/${id}`);
  }

  atualizar(historico: Historico): Observable<Historico> 
  {
    return this.http.put<Historico>(`${this.apiUrl}/${historico.id}`, historico);
  }

  remover(id: number): Observable<void> 
  {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

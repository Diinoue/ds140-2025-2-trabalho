import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AlteracaoLog } from '../shared/models/alteracao-log';

@Injectable({
  providedIn: 'root'
})
export class Alteracaoservice {
  
private apiUrl = 'http://localhost:8080/alteracoes';

  constructor(private http: HttpClient) {}

  listarTodas(): Observable<AlteracaoLog[]> {
    return this.http.get<AlteracaoLog[]>(this.apiUrl);
  }

  inserir(alteracao: AlteracaoLog): Observable<AlteracaoLog> {
    return this.http.post<AlteracaoLog>(this.apiUrl, alteracao);
  }

  buscarPorId(id: number): Observable<AlteracaoLog> {
    return this.http.get<AlteracaoLog>(`${this.apiUrl}/${id}`);
  }

  atualizar(alteracao: AlteracaoLog): Observable<AlteracaoLog> {
    return this.http.put<AlteracaoLog>(`${this.apiUrl}/${alteracao.id}`, alteracao);
  }

  remover(id: number): Observable<AlteracaoLog> {
    return this.http.delete<AlteracaoLog>(`${this.apiUrl}/${id}`);
  }
}
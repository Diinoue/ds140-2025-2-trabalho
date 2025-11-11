import { Injectable } from '@angular/core';
import { Funcionario } from '../shared/models/funcionario.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const LS_CHAVE = "funcionarios";

@Injectable({
  providedIn: 'root'
})
export class Funcionarioservice {


private apiUrl = 'http://localhost:8080/funcionarios';

  constructor(private http: HttpClient) {}

  listarTodos(): Observable<Funcionario[]> {
    return this.http.get<Funcionario[]>(this.apiUrl);
  }

  inserir(funcionario: Funcionario): Observable<Funcionario> {
    return this.http.post<Funcionario>(this.apiUrl, funcionario);
  }

  buscarPorId(id: number): Observable<Funcionario> {
    return this.http.get<Funcionario>(`${this.apiUrl}/${id}`);
  }

  atualizar(funcionario: Funcionario): Observable<Funcionario> {
    return this.http.put<Funcionario>(`${this.apiUrl}/${funcionario.id}`, funcionario);
  }

  remover(id: number): Observable<Funcionario> {
    return this.http.delete<Funcionario>(`${this.apiUrl}/${id}`);
  }

  
}

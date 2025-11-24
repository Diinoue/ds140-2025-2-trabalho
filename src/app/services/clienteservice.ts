import { Injectable } from '@angular/core';
import { Cliente } from '../shared/models/cliente.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Clienteservice {
  private cepUrl = 'https://viacep.com.br/ws';
  private apiUrl = 'http://localhost:8080/clientes';

  constructor(private http: HttpClient) {}

  listarAtivos(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.apiUrl);
  }

  buscarAtivoPorId(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.apiUrl}/${id}`);
  }

  inserir(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.apiUrl, cliente);
  }

  atualizar(cliente: Cliente): Observable<Cliente> { 
    return this.http.put<Cliente>(`${this.apiUrl}/${cliente.id}`, cliente);
  }
  
  remover(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  buscarCep(cep: string): Observable<any> {
    return this.http.get(`${this.cepUrl}/${cep}/json`);
  }
}
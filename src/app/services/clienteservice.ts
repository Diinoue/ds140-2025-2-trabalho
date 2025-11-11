import { Injectable } from '@angular/core';
import { Cliente } from '../shared/models/cliente.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const LS_CHAVE = "clientes";

@Injectable({
  providedIn: 'root'
})
export class Clienteservice {
  private cepUrl = 'https://viacep.com.br/ws';
  private apiUrl = 'http://localhost:8080/solicitacao';

  constructor(private http: HttpClient) {
  }

  listarTodos(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.apiUrl);
  }

  inserir(cliente: Cliente) : Observable<Cliente> {
    return this.http.post<Cliente>(this.apiUrl, cliente);
  }

  buscarPorId(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.apiUrl}/${id}`);
  }

  atualizar(cliente: Cliente) : Observable<Cliente> { 
    return this.http.put<Cliente>(`${this.apiUrl}/${cliente.id}`, cliente);
  }
  
  remover(id: number) : Observable<Cliente> {
    return this.http.delete<Cliente>(`${this.apiUrl}/${id}`);
  }

  buscarCep(cep: string): Observable<any> {
    return this.http.get(`${this.cepUrl}/${cep}/json`);
  }

}

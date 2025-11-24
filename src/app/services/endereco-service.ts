import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Endereco } from '../shared/models/endereco';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {
  private apiUrl = 'http://localhost:8080/enderecos';

  constructor(private http:HttpClient) {}

// REQUISIÇÕES POST

  inserir(endereco: Endereco): Observable<Endereco> {
    console.log("enderecoService está executando")
    return this.http.post<Endereco>(this.apiUrl, endereco)
  }
  
// REQUISIÇÕES GET
  listarTodos(): Observable<Endereco[]> {
    return this.http.get<Endereco[]>(this.apiUrl);
  }

  buscarPorId(id: number):Observable<Endereco> {
    return this.http.get<Endereco>(`${this.apiUrl}/${id}`);
  }

// REQUISIÇÕES PUT

// REQUISIÇÕES DELETE
}

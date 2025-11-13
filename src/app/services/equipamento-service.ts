import { Injectable } from '@angular/core';
import { Equipamento } from '../shared/models/equipamento.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const LS_CHAVE = "equipamentos";

@Injectable({providedIn: 'root'}) 

export class EquipamentoService {

/*
MUDANÇAS EQUIPAMENTOS: Agr não sera mais armazenada em um vetor de string, será guardado
como um model;

*/

  private apiUrl = 'http://localhost:8080/equipamentos';

  constructor(private http: HttpClient) {}

  listarTodos(): Observable<Equipamento[]> {
    return this.http.get<Equipamento[]>(this.apiUrl);
  }

  inserir(equipamento: Equipamento): Observable<Equipamento> {
    return this.http.post<Equipamento>(this.apiUrl, equipamento);
  }

  buscarPorId(id: number): Observable<Equipamento> {
    return this.http.get<Equipamento>(`${this.apiUrl}/${id}`);
  }

  atualizar(equipamento: Equipamento): Observable<Equipamento> {
    return this.http.put<Equipamento>(`${this.apiUrl}/${equipamento.id}`, equipamento);
  }

  remover(id: number): Observable<Equipamento> {
    return this.http.delete<Equipamento>(`${this.apiUrl}/${id}`);
  }

}

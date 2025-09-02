import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { Solicitacaoservice } from '../../services/solicitacaoservice';

//FALTA ADICIONAR O DISPLAY DAS INFORMACOES DO CLIENTE

@Component({
  selector: 'app-rf005-mostrarorcamento',
  templateUrl: './rf005-mostrarorcamento.html',
  styleUrls: ['./rf005-mostrarorcamento.css'],
  imports: [ReactiveFormsModule, DatePipe]
})
export class Rf005Mostrarorcamento implements OnInit {
  solicitacoes: any[] = [];
  forms: FormGroup[] = [];

  constructor(private fb: FormBuilder, private solicitacaoService: Solicitacaoservice) {}

  ngOnInit(): void {}
  
  cliente = { cpf: 122121212, nome: 'jerso', email: 'jersokawaii@gmail.com', cep: '3624235', telefone: '62362363'};

  rf005showSolicitacoes() {
    this.solicitacoes = this.solicitacaoService.getSolicitacoes();
    this.forms = this.solicitacoes.map(() => this.fb.group({ orcamento: [''] }));
  }

  addOrcamento(index: number) {
    const valor = this.forms[index].value.orcamento;
    this.solicitacoes[index].orcamento = valor;
  }

  trackByIndex(index: number): number {
    return index;
  }
}

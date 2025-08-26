import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { Solicitacaoservice } from '../../services/solicitacaoservice';

@Component({
  selector: 'app-rf003-pagcliente',
  imports: [DatePipe],
  templateUrl: './rf003-pagcliente.html',
  styleUrl: './rf003-pagcliente.css'
})

export class Rf003Pagcliente {
  solicitacoes: any[] = [];

  constructor(private fb: FormBuilder, private solicitacaoService: Solicitacaoservice) {}

  ngOnInit(): void {}

  metdado_serivice() {
    this.solicitacoes = this.solicitacaoService.getSolicitacoes();
  }
  

}

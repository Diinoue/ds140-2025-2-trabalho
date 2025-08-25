import { Component, OnInit, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ReactiveFormsModule, FormControl, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Solicitacaoservice } from '../../services/solicitacaoservice';

@Component({
  selector: 'app-rf005-mostrarorcamento',
  templateUrl: './rf005-mostrarorcamento.html',
  styleUrl: './rf005-mostrarorcamento.css',
  imports: [ReactiveFormsModule, DatePipe]
})
export class Rf005Mostrarorcamento implements OnInit{
  solicitacoes: any[] = [];
  fb = inject(FormBuilder);
  
  constructor(private solicitacaoService: Solicitacaoservice) {};
  ngOnInit(): void {}
/*
  formOrcamento = new FormGroup({
    orcamento: new FormControl(''),
  });
*/

  formOrcamentoDois = this.fb.group({
      preco: this.fb.array([])
  });

  get itensPreco() {
    return (this.formOrcamentoDois.get('preco') as FormArray).controls as FormGroup[];
  }
  
    rf005showSolicitacoes(){
    this.solicitacoes = this.solicitacaoService.getSolicitacoes();
    /*
      for(let i in this.solicitacoes){
      console.log(`${this.solicitacoes[i].descricaoEquipamento} ${this.solicitacoes[i].descricaoDefeito}`)
      }
    */
  }
  
    addOrcamento(){
      const preco = this.fb.group({
        precoOrcamento: ['']
      });

      return (this.formOrcamentoDois.get('preco') as FormArray).push(preco);
    }
    
}
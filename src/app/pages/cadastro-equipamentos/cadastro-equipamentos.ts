import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EquipamentoService } from '../../services/equipamento-service';
import {  Router } from '@angular/router';
import { Equipamento } from '../../shared/models/equipamento.model';

@Component
({
  selector: 'app-cadastro-equipamentos',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './cadastro-equipamentos.html',
  styleUrl: './cadastro-equipamentos.css'
})
export class CadastroEquipamentos 
{
  formEquipamento: FormGroup;

  constructor
  (
    private fb: FormBuilder,
    private equipamentoService: EquipamentoService,
    private router: Router,
  ) 
  {
    this.formEquipamento = this.fb.group
    ({
      nome: ['', Validators.required],
    });
  }

  onSubmit() 
  {
    if (this.formEquipamento.valid) 
      {
        const equipamento = new Equipamento();
        equipamento.nome = this.formEquipamento.value.nome;

       this.equipamentoService.inserir(equipamento).subscribe
         ({
           next: (response) => {
           alert(`Equipamento "${response.nome}" cadastrado com sucesso!`);
           this.formEquipamento.reset();
           this.router.navigate(['lista-equipamentos']);
                            },
           error: (err) => {
          console.error('Erro ao cadastrar equipamento', err);
          alert('Erro ao cadastrar equipamento.');
                           }
        });
      }
  }
}
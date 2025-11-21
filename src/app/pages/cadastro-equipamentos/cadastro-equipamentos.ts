import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EquipamentoService } from '../../services/equipamento-service';
import {  Router } from '@angular/router';
import { Equipamento } from '../../shared/models/equipamento.model';

@Component({
  selector: 'app-cadastro-equipamentos',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './cadastro-equipamentos.html',
  styleUrls: ['./cadastro-equipamentos.css']
})
export class CadastroEquipamentos {

  // formulário reativo
  formEquipamento: FormGroup;

  // lista de equipamentos já cadastrados

  constructor(
    private fb: FormBuilder,
    private equipamentoService: EquipamentoService,
    private router: Router,
  ) {
    // inicializa o form com um campo obrigatório
    this.formEquipamento = this.fb.group({
      nome: ['', Validators.required],
    });
  }


  onSubmit(){
    if (this.formEquipamento.valid) {
      const equipamento = new Equipamento();
      equipamento.nome = this.formEquipamento.value.nome;
      // salva no localStorage
      this.equipamentoService.inserir(equipamento).subscribe(response => {
        console.log("Criado:", response);
      });    
      this.router.navigate(['lista-equipamentos']);
    }
  }


}

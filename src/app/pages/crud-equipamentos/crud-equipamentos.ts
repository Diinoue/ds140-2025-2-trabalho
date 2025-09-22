import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EquipamentoService } from '../../services/equipamento-service';
import { CadastroEquipamentos } from '../cadastro-equipamentos/cadastro-equipamentos';

@Component({
  selector: 'app-crud-equipamentos',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './crud-equipamentos.html',
  styleUrl: './crud-equipamentos.css'
})
export class CrudEquipamentos {
    Equipament:formEquipamento[]=[];
  constructor(
      private EquipamentoService: EquipamentoService,    
    ) {}


}


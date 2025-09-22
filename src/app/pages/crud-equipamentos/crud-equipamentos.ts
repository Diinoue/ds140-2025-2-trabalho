import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EquipamentoService } from '../../services/equipamento-service';

@Component({
  selector: 'app-crud-equipamentos',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './crud-equipamentos.html',
  styleUrl: './crud-equipamentos.css'
})
export class CrudEquipamentos implements OnInit{
    Equipament:string[]=[];
  constructor(
      private EquipamentoService: EquipamentoService,    
    ) {}

    ngOnInit(): void {
        
    }
}


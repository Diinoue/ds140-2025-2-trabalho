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
    Equipamento:string[]=[];
  constructor(
      private EquipamentoService: EquipamentoService,    
    ) {}

    ngOnInit(): void {
        this.Equipamento = this.EquipamentoService.listarTodos();
    }

    editarEquipamento(novoNome: string, equipamento: string) : void {
      this.EquipamentoService.atualizar(novoNome, equipamento)
    }

    deletarEquipamento(equipamento: string) : void {
      if(window.confirm("Você tem certeza? Os dados serão excluidos permanentemente."))
      {
        this.EquipamentoService.remover(equipamento);
        this.Equipamento = this.EquipamentoService.listarTodos();
      }
}

    
}



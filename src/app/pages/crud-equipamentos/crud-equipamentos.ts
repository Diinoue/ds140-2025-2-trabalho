import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EquipamentoService } from '../../services/equipamento-service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditarEquipamento } from '../editar-equipamento/editar-equipamento'
import { Equipamento } from '../../shared/models/equipamento.model';

@Component({
  selector: 'app-crud-equipamentos',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './crud-equipamentos.html',
  styleUrl: './crud-equipamentos.css'
})
export class CrudEquipamentos implements OnInit{
    equipamentos:Equipamento[]=[];
  constructor(
      private equipamentoService: EquipamentoService,
      private modalService: NgbModal,
    ) {}

    ngOnInit(): void {
      this.carregarEquipamentos();
    }

  carregarEquipamentos() {
  this.equipamentoService.listarTodos().subscribe(data => {
    this.equipamentos = data;
  });
}


    deletarEquipamento(equipamento: Equipamento) : void {
      if(window.confirm("Você tem certeza? Os dados serão excluidos permanentemente."))
      {
        this.equipamentoService.remover(equipamento.id);
        this.carregarEquipamentos();
      }
}

  abrirModalEquipamento(equipamento: string) {
    const modalRef = this.modalService.open(EditarEquipamento);
    modalRef.componentInstance.equipamento = equipamento;
  }

}



import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EquipamentoService } from '../../services/equipamento-service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditarEquipamento } from '../editar-equipamento/editar-equipamento'

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
      private modalService: NgbModal,
    ) {}

    ngOnInit(): void {
        this.Equipamento = this.EquipamentoService.listarTodos();
    }

    deletarEquipamento(equipamento: string) : void {
      if(window.confirm("Você tem certeza? Os dados serão excluidos permanentemente."))
      {
        this.EquipamentoService.remover(equipamento);
        this.Equipamento = this.EquipamentoService.listarTodos();
      }
}

  abrirModalEquipamento(equipamento: string) {
    const modalRef = this.modalService.open(EditarEquipamento);
    modalRef.componentInstance.equipamento = equipamento;
  }

}



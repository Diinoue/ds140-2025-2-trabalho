import { Component, Input} from '@angular/core';
import { Funcionario } from '../../shared/models/funcionario.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-visualizar-funcionario',
  imports: [DatePipe],
  templateUrl: './visualizar-funcionario.html',
  styleUrl: './visualizar-funcionario.css'
})

export class VisualizarFuncionario {

@Input() funcionario!: Funcionario;

constructor(
  public activeModal: NgbActiveModal,
) {}




}

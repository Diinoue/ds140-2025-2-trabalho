import { Component, Input} from '@angular/core';
import { Funcionario } from '../../shared/models/funcionario.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-visualizar-funcionario',
  imports: [],
  templateUrl: './visualizar-funcionario.html',
  styleUrl: './visualizar-funcionario.css'
})

export class VisualizarFuncionario {

@Input() funcionario!: Funcionario;

constructor(
  public activeModal: NgbActiveModal,
) {}




}

import { Component, Input} from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { EquipamentoService } from '../../services/equipamento-service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Equipamento } from '../../shared/models/equipamento.model';

@Component({
  selector: 'app-editar-equipamento',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './editar-equipamento.html',
  styleUrl: './editar-equipamento.css'
})

export class EditarEquipamento{

  // formulário reativo
  formEquipamento: FormGroup;
  // lista de equipamentos já cadastrados

  @Input() equipamento!: Equipamento;

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private equipamentoService: EquipamentoService,
  ) {
    // inicializa o form com um campo obrigatório
    this.formEquipamento = this.fb.group({
      nome: ['', Validators.required],
    });
  }


  onSubmit(){
    if (this.formEquipamento.valid) {
      this.equipamento.nome = this.formEquipamento.value.nome;

      // salva no localStorage
    this.equipamentoService.atualizar(this.equipamento).subscribe(response => {console.log("teste")});
    this.activeModal.close();
    }
  }

}

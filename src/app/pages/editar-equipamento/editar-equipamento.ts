import { Component, OnInit, Input} from '@angular/core';import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { EquipamentoService } from '../../services/equipamento-service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxMaskPipe } from 'ngx-mask';

@Component({
  selector: 'app-editar-equipamento',
  standalone: true,
  imports: [ReactiveFormsModule, NgxMaskPipe],
  templateUrl: './editar-equipamento.html',
  styleUrl: './editar-equipamento.css'
})

export class EditarEquipamento implements OnInit{

  // formulário reativo
  formEquipamento: FormGroup;
  // lista de equipamentos já cadastrados

  @Input() equipamento!: string;

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private equipamentoService: EquipamentoService,
    private router: Router,
  ) {
    // inicializa o form com um campo obrigatório
    this.formEquipamento = this.fb.group({
      nome: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  // Implementar depois na service
  // const res = this.equipamentoService.buscarPorNome(this.equipamento);
  }

  onSubmit(){
    if (this.formEquipamento.valid) {
      const nome = this.formEquipamento.value.nome;

      // salva no localStorage
    this.equipamentoService.atualizar(nome, this.equipamento);
    console.log(this.equipamento);
    console.log(nome);
    this.activeModal.close();
    }
  }

}

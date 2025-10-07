import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { EquipamentoService } from '../../services/equipamento-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editar-equipamento',
  imports: [ReactiveFormsModule],
  templateUrl: './editar-equipamento.html',
  styleUrl: './editar-equipamento.css'
})

export class EditarEquipamento implements OnInit{

  // formulário reativo
  formEquipamento: FormGroup;
  equipamento: string = '';
  // lista de equipamentos já cadastrados

  constructor(
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
  this.equipamento = this.route.snapshot.params['id'];
  }

  onSubmit(){
    if (this.formEquipamento.valid) {
      const nome = this.formEquipamento.value.nome;

      // salva no localStorage
    this.equipamentoService.atualizar(this.equipamento, nome);
    this.router.navigate(['lista-equipamentos']);
    }
  }


}

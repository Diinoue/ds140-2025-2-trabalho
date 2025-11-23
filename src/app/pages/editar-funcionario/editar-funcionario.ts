import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Funcionario } from '../../shared/models/funcionario.model';
import { Funcionarioservice } from '../../services/funcionarioservice';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-visualizar-funcionario',
  imports: [ReactiveFormsModule],
  templateUrl: './editar-funcionario.html',
  styleUrl: './editar-funcionario.css'
})

export class EditarFuncionario implements OnInit {
funcionario: Funcionario = new Funcionario();
newEmail: string = '';
newDataNasc: Date = new Date();
newEmailForm = new FormGroup({
  email: new FormControl('')
})

newDataNascForm = new FormGroup({
  dataNasc: new FormControl()
})


constructor(
  private route: ActivatedRoute,
  private funcionarioService: Funcionarioservice,
) {}


ngOnInit(): void {
  this.newDataNasc = new Date();
  let id = +this.route.snapshot.params['id'];
  this.carregarFuncionario(id);
}

onSubmitEmail(){
  const res = this.newEmailForm.value.email;
  if(res != undefined)this.funcionario.email = res;
  else throw console.error('erro');
  this.funcionarioService.atualizar(this.funcionario);
  this.carregarFuncionario(this.funcionario.id!);
  console.log(this.newEmailForm.value);
}

onSubmitDataNasc(){
  this.funcionario.dataNasc = this.newDataNascForm.value.dataNasc;
  this.funcionarioService.atualizar(this.funcionario);
  this.carregarFuncionario(this.funcionario.id!);
  console.log(this.newDataNascForm.value);
}

carregarFuncionario(id: number) {
  this.funcionarioService.buscarPorId(id).subscribe(data => {
    this.funcionario = data;
  });
}



}

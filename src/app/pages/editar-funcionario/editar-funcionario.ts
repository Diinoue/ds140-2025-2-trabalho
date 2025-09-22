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

  this.buscarFunc();
}

onSubmitEmail(){
  const res = this.newEmailForm.value.email;
  if(res != undefined)this.funcionario.email = res;
  else throw console.error('erro');
  this.funcionarioService.atualizar(this.funcionario);
  this.buscarFunc();
  console.log(this.newEmailForm.value);
}

onSubmitDataNasc(){
  this.funcionario.dataNasc = this.newDataNascForm.value.dataNasc;
  this.funcionarioService.atualizar(this.funcionario);
  this.buscarFunc();
  console.log(this.newDataNascForm.value);
}

buscarFunc(): void {
  let id = +this.route.snapshot.params['id'];
  const res = this.funcionarioService.buscarPorId(id);
  if (res !== undefined) this.funcionario = res;
  else throw new Error ("Pessoa não encontrada: id = " + id);
}

}

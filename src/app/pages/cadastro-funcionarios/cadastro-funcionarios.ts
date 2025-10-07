import { Component } from '@angular/core';
import { FormsModule, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; 
import { Funcionario } from '../../shared/models/funcionario.model';
import { Funcionarioservice } from '../../services/funcionarioservice';

@Component({
  selector: 'app-cadastro-funcionarios',
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './cadastro-funcionarios.html',
  styleUrl: './cadastro-funcionarios.css'
})
export class CadastroFuncionarios {
 funcionarioNovo: Funcionario = new Funcionario();
  formFuncionario: FormGroup;

  constructor(
    private fb: FormBuilder, private funcionarioService: Funcionarioservice
  )
  {
    this.formFuncionario = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      nome: ['', Validators.required],
      dataNasc : ['', Validators.required],     
      senha: ['', [Validators.required, Validators.required]], 
    });
  }

  onSubmit() {
    if(this.formFuncionario.valid)
      {
      const dadosFormFuncionario = this.formFuncionario.value;
      this.funcionarioNovo.email = dadosFormFuncionario.email;
      this.funcionarioNovo.nome = dadosFormFuncionario.nome;
      this.funcionarioNovo.dataNasc = dadosFormFuncionario.dataNasc;
      this.funcionarioNovo.senha = dadosFormFuncionario.senha;
      this.funcionarioService.inserir(this.funcionarioNovo);
      alert(`Funcionario cadastrado!\nSenha enviada para ${dadosFormFuncionario.email}: ${dadosFormFuncionario.senha}`);
   this.formFuncionario.reset();
     }

    }
  }

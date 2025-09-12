import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Cliente } from '../shared/models/cliente.model';
import { Clienteservice } from '../services/clienteservice';



@Component({
  selector: 'app-rf001-autocadastro',
  imports: [
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './rf001-autocadastro.html',
  styleUrl: './rf001-autocadastro.css'
})
export class Rf001Autocadastro {
  clienteNovo: Cliente = new Cliente();
  formularioAutoCadastro: FormGroup;

  constructor(private fb: FormBuilder, private clienteService: Clienteservice) {
    this.formularioAutoCadastro = this.fb.group({
      cpf: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cep: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]], 
      telefone: ['', [Validators.required, Validators.pattern(/^\d{10,11}$/)]], 
    });
  }

  onSubmit() {
    if (this.formularioAutoCadastro.valid) {
      const user = this.formularioAutoCadastro.value;
      this.clienteNovo.cpf = user.cpf;
      this.clienteNovo.nome = user.nome;
      this.clienteNovo.email = user.email;
      this.clienteNovo.cep = user.cep;
      this.clienteNovo.telefone = user.telefone;

      const senha = Math.floor(1000 + Math.random() * 9000).toString();
      this.clienteNovo.senha = senha;

      this.clienteService.inserir(this.clienteNovo);

      console.log("Novo usuário cadastrado:", user);
      alert(`Usuário cadastrado!\nSenha enviada para ${user.email}: ${senha}`);
    }
  }

}

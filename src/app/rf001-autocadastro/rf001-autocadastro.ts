import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

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
  formularioAutoCadastro: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formularioAutoCadastro = this.fb.group({
      cpf: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]], // 11 digits
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cep: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],  // 8 digits
      telefone: ['', [Validators.required, Validators.pattern(/^\d{10,11}$/)]], // 10-11 digits
    });
  }

  onSubmit() {
    if (this.formularioAutoCadastro.valid) {
      const user = this.formularioAutoCadastro.value;

      const senha = Math.floor(1000 + Math.random() * 9000).toString();
      user.senha = senha;

      console.log("Novo usuário cadastrado:", user);

      alert(`Usuário cadastrado!\nSenha enviada para ${user.email}: ${senha}`);
    }
  }

}

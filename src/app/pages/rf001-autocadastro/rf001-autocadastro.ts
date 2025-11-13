import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Cliente } from '../../shared/models/cliente.model';
import { Clienteservice } from '../../services/clienteservice';



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
      cep: ['', [Validators.required, Validators.pattern(/^\d{5}-?\d{3}$/)]], 
      telefone: ['', [Validators.required, Validators.pattern(/^\d{10,11}$/)]], 
    });
  }

  onSubmit() {
  if (this.formularioAutoCadastro.valid) {
    const user = this.formularioAutoCadastro.value;

    this.clienteService.buscarCep(user.cep).subscribe({
      next: (dados: any) => {
        // Preenche o endereço apenas se CEP for válido
        const endereco = dados.erro ? null : {
          logradouro: dados.logradouro,
          bairro: dados.bairro,
          cidade: dados.localidade,
          uf: dados.uf
        };

        // Atualiza o cliente
        this.clienteNovo = {
          id: 0,
          cpf: user.cpf,
          nome: user.nome,
          email: user.email,
          cep: user.cep,
          telefone: user.telefone,
          senha: Math.floor(1000 + Math.random() * 9000).toString(),
          endereco,
        };

        // Insere no serviço
        this.clienteService.inserir(this.clienteNovo);

        console.log("Novo usuário cadastrado:", this.clienteNovo);
        alert(`Usuário cadastrado!\nSenha enviada para ${user.email}: ${this.clienteNovo.senha}`);
      },
      error: (err) => {
        console.error('Endereço não encontrado', err);
        alert('CEP inválido! Não foi possível cadastrar o usuário.');
      }
    });
  }
}


}

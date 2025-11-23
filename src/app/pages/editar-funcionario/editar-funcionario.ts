import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Funcionario } from '../../shared/models/funcionario.model';
import { Funcionarioservice } from '../../services/funcionarioservice';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-editar-funcionario',
  imports: [ReactiveFormsModule],
  templateUrl: './editar-funcionario.html',
  styleUrl: './editar-funcionario.css'
})
export class EditarFuncionario implements OnInit {
  funcionario: Funcionario = new Funcionario();

  // Forms independentes
  newEmailForm = new FormGroup({ email: new FormControl('') });
  newDataNascForm = new FormGroup({ dataNasc: new FormControl() });
  newNomeForm = new FormGroup({ nome: new FormControl('') });
  newSenhaForm = new FormGroup({ senha: new FormControl('') });

  constructor(
    private route: ActivatedRoute,
    private funcionarioService: Funcionarioservice,
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.params['id'];
    this.carregarFuncionario(id);
  }

  carregarFuncionario(id: number) {
    this.funcionarioService.buscarPorId(id).subscribe(data => {
      this.funcionario = data;
    });
  }

  /** Função auxiliar para montar objeto atualizado */
  private montarFuncionarioAtualizado(parcial: Partial<Funcionario>): Funcionario {
    return {
      id: this.funcionario.id!,
      nome: parcial.nome ?? this.funcionario.nome,
      senha: parcial.senha ?? this.funcionario.senha,
      email: parcial.email ?? this.funcionario.email,
      dataNasc: parcial.dataNasc ?? this.funcionario.dataNasc,
      rota: this.funcionario.rota // rota nunca muda
    };
  }

  onSubmitEmail() {
    const novoEmail = this.newEmailForm.value.email;
    if (!novoEmail) return;

    const funcionarioAtualizado = this.montarFuncionarioAtualizado({ email: novoEmail });
    this.funcionarioService.atualizar(funcionarioAtualizado).subscribe({
      next: () => {
        alert('Email atualizado com sucesso!');
        this.carregarFuncionario(this.funcionario.id!);
        
      },
      error: (err) => {
        if (err.status === 409) {
          alert('Esse email já está em uso por outro funcionário.');
        } else {
          alert('Erro ao atualizar email.');
        }
      }
    });
  }

  onSubmitDataNasc() {
    const novaData = this.newDataNascForm.value.dataNasc;
    if (!novaData) return;

    const funcionarioAtualizado = this.montarFuncionarioAtualizado({ dataNasc: novaData });
    this.funcionarioService.atualizar(funcionarioAtualizado).subscribe({
      next: () => {
        alert('Data de nascimento atualizada com sucesso!');
        this.carregarFuncionario(this.funcionario.id!);
      },
      error: () => alert('Erro ao atualizar data de nascimento.')
    });
  }

  onSubmitNome() {
    const novoNome = this.newNomeForm.value.nome;
    if (!novoNome) return;

    const funcionarioAtualizado = this.montarFuncionarioAtualizado({ nome: novoNome });
    this.funcionarioService.atualizar(funcionarioAtualizado).subscribe({
      next: () => {
        alert('Nome atualizado com sucesso!');
        this.carregarFuncionario(this.funcionario.id!);
      },
      error: () => alert('Erro ao atualizar nome.')
    });
  }

  onSubmitSenha() {
    const novaSenha = this.newSenhaForm.value.senha;
    if (!novaSenha) return;

    const funcionarioAtualizado = this.montarFuncionarioAtualizado({ senha: novaSenha });
    this.funcionarioService.atualizar(funcionarioAtualizado).subscribe({
      next: () => {
        alert('Senha atualizada com sucesso!');
        this.carregarFuncionario(this.funcionario.id!);
      },
      error: () => alert('Erro ao atualizar senha.')
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Funcionario } from '../../shared/models/funcionario.model';
import { Funcionarioservice } from '../../services/funcionarioservice';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-editar-funcionario',
  imports: [ReactiveFormsModule], 
  templateUrl: './editar-funcionario.html',
  styleUrl: './editar-funcionario.css'
})
export class EditarFuncionario implements OnInit {
  funcionario: Funcionario = new Funcionario();
  
  editarFuncionarioForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private funcionarioService: Funcionarioservice,
    private router: Router,
    private fb: FormBuilder 
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.params['id'];
    this.carregarFuncionario(id);
    
    this.editarFuncionarioForm = this.fb.group({
      email: [''],
      dataNasc: [null],
      nome: [''],
      senha: ['']
    });
  }

  carregarFuncionario(id: number) {
    this.funcionarioService.buscarPorId(id).subscribe(data => {
      this.funcionario = data;
      this.editarFuncionarioForm.patchValue({
        email: data.email,
        dataNasc: data.dataNasc,
        nome: data.nome,
        senha: '' 
      });
    });
  }

  private montarFuncionarioAtualizado(parcial: Partial<Funcionario>): Funcionario {
    return {
      id: this.funcionario.id!,
      nome: parcial.nome ?? this.funcionario.nome,
      senha: parcial.senha ?? this.funcionario.senha,
      email: parcial.email ?? this.funcionario.email,
      dataNasc: parcial.dataNasc ?? this.funcionario.dataNasc,
      perfil: this.funcionario.perfil // rota nunca muda
    };
  }

  onSubmit() {

    if (this.editarFuncionarioForm.pristine) {
      alert('Nenhuma alteração detectada.');
      return;
    }

    const alteracoes: Partial<Funcionario> = {};
    const formValues = this.editarFuncionarioForm.value;

    if (this.editarFuncionarioForm.get('email')?.dirty && formValues.email !== this.funcionario.email && formValues.email) {
      alteracoes.email = formValues.email;
    }
    
    if (this.editarFuncionarioForm.get('dataNasc')?.dirty && formValues.dataNasc !== this.funcionario.dataNasc && formValues.dataNasc) {
      alteracoes.dataNasc = formValues.dataNasc;
    }

    if (this.editarFuncionarioForm.get('nome')?.dirty && formValues.nome !== this.funcionario.nome && formValues.nome) {
      alteracoes.nome = formValues.nome;
    }

    if (this.editarFuncionarioForm.get('senha')?.dirty && formValues.senha) {
      alteracoes.senha = formValues.senha;
    }

    if (Object.keys(alteracoes).length === 0) {
      alert('Nenhuma alteração válida para ser salva.');
      return;
    }

    const funcionarioAtualizado = this.montarFuncionarioAtualizado(alteracoes);

    this.funcionarioService.atualizar(funcionarioAtualizado).subscribe({
      next: () => {
        alert('Informações do funcionário atualizadas com sucesso!');
        this.router.navigate(['lista-funcionarios']);
      },
      error: (err) => {
        if (err.status === 409) {
          alert('Erro: Esse email já está em uso por outro funcionário.');
        } else {
          const camposAlterados = Object.keys(alteracoes).join(', ');
          alert(`Erro ao atualizar os campos: ${camposAlterados}.`);
        }
      }
    });
  }

}
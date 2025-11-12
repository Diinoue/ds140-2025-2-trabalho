import { Component, OnInit } from '@angular/core';
import { Funcionarioservice } from '../../services/funcionarioservice';
import { Funcionario } from '../../shared/models/funcionario.model';
import { VisualizarFuncionario } from '../visualizar-funcionario/visualizar-funcionario';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Loginservice } from '../../services/loginservice';
import { Usuario } from '../../shared/models/usuario.model';

@Component({
  selector: 'app-crud-funcionario',
  templateUrl: './crud-funcionario.html',
  styleUrl: './crud-funcionario.css'
})

export class CrudFuncionario implements OnInit{
  Funcionarios:Funcionario[]=[];
  funcionarioLogin: Usuario = new Usuario;
constructor(
    private funcionarioService: Funcionarioservice,  
    private loginService: Loginservice,
    private modalService: NgbModal,
  ) {}

ngOnInit(): void {
  this.carregarFuncionarios();
  const res = this.loginService.usuarioLogado;
  if (res == null) console.log("nao logado");
  else this.funcionarioLogin = res;
  //TEM QUE SABER O USUARIO LOGADO AQUI
}

carregarFuncionarios(): void {
  this.funcionarioService.listarTodos().subscribe({
    next: (dados) => this.Funcionarios = dados,
    error: () => alert('Erro ao carregar funcionários.')
  });
}

deletarFuncionario(id: number): void {
  if(window.confirm("Você tem certeza? Os dados serão excluidos permanentemente."))
  {

    if(this.funcionarioLogin.id != id) {
      if(this.Funcionarios.length > 1) {
      this.funcionarioService.remover(id).subscribe({
        next:(res) => {
          this.carregarFuncionarios();
        },
        error: () => {
              alert('Falha ao excluir funcionário.');
        },
      });
      } else alert("Existem apenas 1 funcionario, função indisponivel");
    }
    else alert("Você não pode se excluir");

  }
}

  abrirModalFuncionario(funcionario: Funcionario) {
    const modalRef = this.modalService.open(VisualizarFuncionario);
    modalRef.componentInstance.funcionario = funcionario;
  }

}

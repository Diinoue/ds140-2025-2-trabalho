import { Component, OnInit } from '@angular/core';
import { Funcionarioservice } from '../../services/funcionarioservice';
import { Funcionario } from '../../shared/models/funcionario.model';
import { VisualizarFuncionario } from '../visualizar-funcionario/visualizar-funcionario';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-crud-funcionario',
  templateUrl: './crud-funcionario.html',
  styleUrl: './crud-funcionario.css'
})

export class CrudFuncionario implements OnInit{
  Funcionarios:Funcionario[]=[];
  funcionarioLogin: number = 0;
constructor(
    private funcionarioService: Funcionarioservice,  
    private modalService: NgbModal,
  ) {}

ngOnInit(): void {
  this.Funcionarios= this.funcionarioService.listarTodos();
  this.funcionarioLogin = this.funcionarioService.getLogin();
}

deletarFuncionario(id: number): void {
  if(window.confirm("Você tem certeza? Os dados serão excluidos permanentemente."))
  {
    if(this.funcionarioLogin != id) {
      if(this.Funcionarios.length > 1) {
      this.funcionarioService.remover(id);
      this.Funcionarios = this.funcionarioService.listarTodos();
      }
      else alert("Existem apenas 1 funcionario, função indisponivel");
    }
    else alert("Você não pode se excluir");
  }
}

  abrirModalFuncionario(funcionario: Funcionario) {
    const modalRef = this.modalService.open(VisualizarFuncionario);
    modalRef.componentInstance.funcionario = funcionario;
  }

}

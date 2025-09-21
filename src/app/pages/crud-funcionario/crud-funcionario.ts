import { Component, OnInit } from '@angular/core';
import { Funcionarioservice } from '../../services/funcionarioservice';
import { Funcionario } from '../../shared/models/funcionario.model';

@Component({
  selector: 'app-crud-funcionario',
  templateUrl: './crud-funcionario.html',
  styleUrl: './crud-funcionario.css'
})

export class CrudFuncionario implements OnInit{
  Funcionarios:Funcionario[]=[];
  
constructor(
    private funcionarioService: Funcionarioservice,      
  ) {}

ngOnInit(): void {
  this.Funcionarios= this.funcionarioService.listarTodos();
}


deletarFuncionario(id: number): void {
  
  if(window.confirm("VOCÊ TEM CERTEZA? OS DADOS SÃO EXCLUIDOS PERMANENTEMENTE!!!"))
  {
  this.funcionarioService.remover(id);
  this.Funcionarios=this.funcionarioService.listarTodos();
  }
  
}
}

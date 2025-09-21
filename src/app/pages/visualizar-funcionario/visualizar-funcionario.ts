import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Funcionario } from '../../shared/models/funcionario.model';
import { Funcionarioservice } from '../../services/funcionarioservice';

@Component({
  selector: 'app-visualizar-funcionario',
  imports: [],
  templateUrl: './visualizar-funcionario.html',
  styleUrl: './visualizar-funcionario.css'
})

export class VisualizarFuncionario implements OnInit {
funcionario: Funcionario = new Funcionario();

constructor(
  private route: ActivatedRoute,
  private funcionarioService: Funcionarioservice,
) {}


ngOnInit(): void {
  let id = +this.route.snapshot.params['id'];
  const res = this.funcionarioService.buscarPorId(id);
  if (res !== undefined) this.funcionario = res;
  else throw new Error ("Pessoa não encontrada: id = " + id);
}


}

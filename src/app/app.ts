import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Clienteservice } from './services/clienteservice';
import { Funcionarioservice } from './services/funcionarioservice';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
/*     Rf001Autocadastro,
    Rf002Login,
    Rf003Pagcliente,
    Rf004SolicitacaoComponent,
    Rf010PagarServico,
    Rf014EfetuarManutencao, */
    RouterOutlet,  
    RouterLink,    
    CommonModule  
],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent implements OnInit{

  constructor(
    private clienteService: Clienteservice,
    private funcionarioService: Funcionarioservice
  ){}
  
  ngOnInit(): void {
  }
  
  sair(): void {
    if(localStorage["loginCliente"] !== "null")
    {
      this.clienteService.clearLogin();
      console.log("cliente deslogado");
    }
    else if (localStorage["loginFuncionario"] !== "null")
    {
      this.funcionarioService.clearLogin();
      console.log("funcionario deslogado");
    }
    else
    {
      window.alert("Você não está logado!");
    }
    
  }

  title = 'ds140-2025-2-trabalho';
}

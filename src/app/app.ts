import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { Clienteservice } from './services/clienteservice';
import { Funcionarioservice } from './services/funcionarioservice';
import { EquipamentoService } from './services/equipamento-service';
import { Cliente } from './shared/models/cliente.model';
import { Funcionario } from './shared/models/funcionario.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    RouterOutlet,
    RouterLink,
    CommonModule
],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent implements OnInit {
  formularioAutoCadastro: FormGroup;

  
  
  
  constructor(
    private clienteService: Clienteservice,
    private funcionarioService: Funcionarioservice,
    private equipamentoService: EquipamentoService,
    private fb: FormBuilder
  ) {
    this.formularioAutoCadastro = this.fb.group({});
  }
  
  ngOnInit(): void {
    const Joao: Cliente = {
      nome: "JOÃO SILVA SANTOS",
      cpf: "12345678900",
      email: "joao.silva@gmail.com",
      senha: "1234",
      cep: "01001000",
      telefone: "95999488160",
      endereco: {
        logradouro: "Rua das Flores",
        bairro: "Centro",
        cidade: "São Paulo",
        uf: "SP"
      }
    };
    this.clienteService.inserir(Joao);
    // ...
    
          this.equipamentoService.inserir('Notebook'); 
          this.equipamentoService.inserir('Desktop'); 
          this.equipamentoService.inserir('Impressora'); 
          this.equipamentoService.inserir('Mouse');
          this.equipamentoService.inserir('Teclado'); 
    
    // 2. Lógica de cadastro de funcionários
    const Maria: Funcionario = {
      id: 1,
      email: "gerente@teste.com",
      nome: "Maria",
      dataNasc: new Date("1980-05-15"),
      senha: "1234"
    };
    // ... (outros funcionários)
    this.funcionarioService.inserir(Maria);
    // ...
    
  }
  
  sair(): void {
    if(localStorage["loginCliente"] !== "null") {
      this.clienteService.clearLogin();
      console.log("cliente deslogado");
    } else if (localStorage["loginFuncionario"] !== "null") {
      this.funcionarioService.clearLogin();
      console.log("funcionario deslogado");
    } else {
      window.alert("Você não está logado!");
    }
  }
  
  title = 'ds140-2025-2-trabalho';
}

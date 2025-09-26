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
<<<<<<< HEAD
=======
  formularioAutoCadastro: FormGroup;

>>>>>>> 0c7d48170c0c5231c56511150ff11ca2539287ac
  
  constructor(
    private clienteService: Clienteservice,
    private funcionarioService: Funcionarioservice,
    private equipamentoService: EquipamentoService,
  )  {}
  
  ngOnInit(): void {
    if(this.equipamentoService.listarTodos() == null) {
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
const Jose: Cliente = {
        nome: "JOSÉ OLIVEIRA COSTA",
        cpf: "98765432100",
        email: "jose.oliveira@gmail.com",
        senha: "1234",
        cep: "20010000",
        telefone: "21987654321",
        endereco: {
            logradouro: "Avenida Brasil",
            bairro: "Centro",
            cidade: "Rio de Janeiro",
            uf: "RJ"
        }
    };
    const Joana: Cliente = {
        nome: "JOANA PEREIRA RODRIGUES",
        cpf: "45678912300",
        email: "joana.pereira@email.com",
        senha: "1234",
        cep: "30010000",
        telefone: "31987654321",
        endereco: {
            logradouro: "Rua da Paz",
            bairro: "Savassi",
            cidade: "Belo Horizonte",
            uf: "MG"
        }
    };

    const Joaquina: Cliente = {
        nome: "JOAQUINA FERNANDES SOUZA",
        cpf: "78912345600",
        email: "joaquina.fernandes@email.com",
        senha: "1234",
        cep: "40010000",
        telefone: "71987654321",
        endereco: {
            logradouro: "Avenida Sete de Setembro",
            bairro: "Comércio",
            cidade: "Belo Salvador",
            uf: "BA"
        }
    };
     this.clienteService.inserir(Joaquina);
      this.clienteService.inserir(Jose);
     this.clienteService.inserir(Joana);
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
    this.funcionarioService.inserir(Maria);

    const Mario: Funcionario = {
      id: 2,
      email: "tecnico@teste.com",
      nome: "Mário",
      dataNasc: new Date("1990-11-20"),
      senha: "1234"
    };

    this.funcionarioService.inserir(Mario);
    }
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

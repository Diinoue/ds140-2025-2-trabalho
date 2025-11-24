import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';
import { Clienteservice } from './services/clienteservice';
import { Funcionarioservice } from './services/funcionarioservice';
import { Loginservice } from './services/loginservice';
import { Usuario } from './shared/models/usuario.model';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    CommonModule
],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent implements OnInit {
  
usuarioLogado: Usuario = new Usuario();

  constructor(
    private loginService: Loginservice,
  )  {}
  
  ngOnInit(): void {
    this.loginService.usuario$.subscribe(usuario => {
      this.usuarioLogado = usuario!;
    });  
  }

  sair(): void {
    if(this.loginService.usuarioLogado !== null) {
      this.loginService.clearLogin();
      console.log("usuario deslogado");
    } else {
      window.alert("Você não está logado!");
    }
  }
  title = 'ds140-2025-2-trabalho';
}

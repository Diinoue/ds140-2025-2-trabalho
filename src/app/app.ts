import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Rf004SolicitacaoComponent } from './rf004-solicitacao/rf004-solicitacao';
import { Rf001Autocadastro } from './rf001-autocadastro/rf001-autocadastro';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    Rf004SolicitacaoComponent, 
    ReactiveFormsModule, 
    Rf001Autocadastro, 
    FormsModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  title = 'ds140-2025-2-trabalho';
}

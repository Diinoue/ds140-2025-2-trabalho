import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Rf004SolicitacaoComponent } from './rf004-solicitacao/rf004-solicitacao';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, Rf004SolicitacaoComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  title = 'ds140-2025-2-trabalho';
}

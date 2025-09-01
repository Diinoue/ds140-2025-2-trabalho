import { Component } from '@angular/core';

@Component({
  selector: 'app-rf013-visualizar-solicitacoes',
  standalone: true,
  templateUrl: './rf013-visualizar-solicitacoes.html',
  styleUrls: ['./rf013-visualizar-solicitacoes.css'],
})
export class Rf013VisualizarSolicitacoes {
  
  solicitacoes = [
    { id: 1, titulo: 'Troca de monitor', status: 'Aberta' },
    { id: 2, titulo: 'Conserto de impressora', status: 'Aprovada' },
    { id: 3, titulo: 'Licença de software', status: 'Rejeitada' },
  ];

  
  getStatusClass(status: string): string {
    const classes: Record<string, string> = {
      Aberta: 'text-blue-500',
      Aprovada: 'text-green-500',
      Rejeitada: 'text-red-500',
    };
    return classes[status] ?? 'text-gray-500';
  }
}
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-rf014-efetuar-manutencao',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './rf014-efetuar-manutencao.html',
  styleUrl: './rf014-efetuar-manutencao.css'
})
export class Rf014EfetuarManutencao {

  solicitacao = {
    id: 123,
    cliente: 'João Pedro',
    descricao: 'Computador não liga',
    estado: 'APROVADA'
  };

  descricaoManutencao: string = '';
  orientacoesCliente: string = '';
  manutencaoEfetuada: boolean = false;

  efetuarManutencao() {
    if (!this.descricaoManutencao || !this.orientacoesCliente) {
      alert('Preencha todos os campos antes de confirmar.');
      return;
    }

    this.manutencaoEfetuada = true;
    this.solicitacao.estado = 'ARRUMADA';
    alert(`Manutenção registrada com sucesso em ${new Date().toLocaleString()}`);
  }

  redirecionarManutencao() {
    alert('Chamar fluxo do RF015 - Redirecionar Manutenção');
  }
}
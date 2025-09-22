import { Component, OnInit } from '@angular/core';
import { Solicitacaoservice } from '../../services/solicitacaoservice';
import { Solicitacao } from '../../shared/models/solicitacao.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from '../../shared/models/cliente.model';
import { Clienteservice } from '../../services/clienteservice';
import { DatePipe } from '@angular/common';
import { dateTimestampProvider } from 'rxjs/internal/scheduler/dateTimestampProvider';
import { AlteracaoLog } from '../../shared/models/alteracao-log';
import { Funcionario } from '../../shared/models/funcionario.model';
import { Funcionarioservice } from '../../services/funcionarioservice';

@Component({
  selector: 'visualizar-servico-cliente',
  imports: [DatePipe],
  templateUrl: './visualizar-servico-cliente.html',
  styleUrl: './visualizar-servico-cliente.css'
})

export class visualizarServicoCliente implements OnInit {
solicitacao: Solicitacao = new Solicitacao();
cliente: Cliente = new Cliente();
alteracaoHist: AlteracaoLog[] = [];
alteracao: AlteracaoLog = new AlteracaoLog();
funcionario: Funcionario = new Funcionario();

constructor(
  private solicitacaoService: Solicitacaoservice,
  private route: ActivatedRoute,
  private clienteService: Clienteservice,
  private router: Router,
  private funcionarioService: Funcionarioservice,

) {}

  ngOnInit(): void {
    let id = +this.route.snapshot.params['id'];
    const res = this.solicitacaoService.buscarPorId(id);
    if (res !== undefined) this.solicitacao = res;
    else throw new Error ("Pessoa não encontrada: id = " + id);

    const res2 = this.clienteService.buscarPorId(this.solicitacao.clienteCPF);
    if (res2 !== undefined) this.cliente = res2;
    else throw new Error ("Cliente não encontrado");

    /*
    O bug do res3 era pq por ALGUM MOTIVO, na função buscarPorId,
    mesmo que id: number, TypeScript não reclamava e guardava id: string 
    */
   
    if(this.solicitacao.estado !== 'ABERTA')
    {
    const res3 = this.funcionarioService.buscarPorId(this.solicitacao.funcionarioID);
    
    if (res3 !== undefined) this.funcionario = res3;
    else throw new Error ("Funcionário não encontrado");
    }
    
    
    this.alteracaoHist = this.solicitacaoService.getAlteracaoByService(this.solicitacao.ID);
  }

  aprovarServico() {
    alert(`Serviço aprovado no valor de R$ ${this.solicitacao.valorOrcado}`);
    this.solicitacao.estado = 'APROVADA';
    this.solicitacaoService.atualizar(this.solicitacao);
    this.registrarAlteracao('Serviço Aprovado', '');
  }

  rejeitarServico() {
    const motivo = prompt('Informe o motivo da rejeição:');
    if (motivo !== null && motivo.trim() !== '') {
      alert('Serviço rejeitado');
      this.solicitacao.motivo = motivo;
      this.solicitacao.estado = 'REJEITADA';
      this.solicitacaoService.atualizar(this.solicitacao);
      this.registrarAlteracao('Serviço Rejeitado', motivo);
      this.router.navigate(['cliente']);
    }
  }

  resgatarServico() {
    this.solicitacao.estado = 'APROVADA';
    this.solicitacaoService.atualizar(this.solicitacao);
    this.registrarAlteracao('Serviço Resgatado', '');
    console.log('Histórico: serviço resgatado em', new Date());
    alert('Serviço resgatado e aprovado novamente');
      this.router.navigate(['cliente']);
  }

  pagarServico() {
    this.solicitacao.estado = 'PAGA';
    this.solicitacao.dataDePagamento = new Date();
    this.solicitacaoService.atualizar(this.solicitacao);
    this.registrarAlteracao('Serviço Pago', '');
    alert('Serviço Pago');
  }
  
  registrarAlteracao(tipo : string, desc : string) {
    this.alteracao.solicitacaoID = this.solicitacao.ID;
    this.alteracao.data = new Date();
    this.alteracao.tipo = tipo;
    this.alteracao.descricao = desc;
    this.solicitacaoService.addAlteracao(this.alteracao);
    this.alteracaoHist = this.solicitacaoService.getAlteracaoByService(this.solicitacao.ID);
  }


}

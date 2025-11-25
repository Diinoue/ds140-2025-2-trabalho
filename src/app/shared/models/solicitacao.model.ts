export class Solicitacao {
  public id?: number;
  public nome: string = '';            
  public dataInicio?: Date;              
  public descricao: string = '';         
  public estado: string = 'ABERTA';      
  public valor: number = 0;              
  public clienteId: number = 0;         
  public funcionarioId?: number;      
  public orientacoes: string = '';       
  public equipamentoId: number = 0;     
  public ativo: boolean = true;          
}

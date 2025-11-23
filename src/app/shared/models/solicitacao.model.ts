export class Solicitacao {
    public id: number = 0;
    public dataHora: Date = new Date();
    public descricaoEquipamento: string = '';
    public categoriaEquipamento: string = '';
    public descricaoDefeito: string = '';
    public estado: string = '';
    public clienteNome: string = ''
    public clienteId: number = 0;
    public funcionarioId: number = 0;
    public valorOrcado: number = 0;
    public dataDePagamento: Date = new Date();
    public motivo: string = '';
    public descricaoManutencao: string = '';
    public orientacoesCliente: string = '';
}

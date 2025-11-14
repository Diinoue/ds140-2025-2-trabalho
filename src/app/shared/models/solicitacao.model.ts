export class Solicitacao {
    public ID: number = 0;
    public dataHora: Date = new Date();
    public descricaoEquipamento: string = '';
    public categoriaEquipamento: string = '';
    public descricaoDefeito: string = '';
    public estado: string = '';
    public clienteNome: string = ''
    public clienteID: number = 0;
    public funcionarioID: number = 0;
    public valorOrcado: number = 0;
    public dataDePagamento: Date = new Date();
    public motivo: string = '';
    public descricaoManutencao: string = '';
    public orientacoesCliente: string = '';
}

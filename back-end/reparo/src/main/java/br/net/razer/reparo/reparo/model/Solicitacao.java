package br.net.razer.reparo.reparo.model;

import java.util.Date;

public class Solicitacao {
    private int id;
    private Date dataHora;
    private String descricaoEquipamento;
    private String categoriaEquipamento;
    private String descricaoDefeito;
    private String estado;
    private String clienteCPF;
    private String clienteNome;
    private int funcionarioID;
    private double valorOrcado;
    private Date dataDePagamento;
    private String motivo;
    private String descricaoManutencao;
    private String orientacoesCliente;

    // Getters e Setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public Date getDataHora() { return dataHora; }
    public void setDataHora(Date dataHora) { this.dataHora = dataHora; }

    public String getDescricaoEquipamento() { return descricaoEquipamento; }
    public void setDescricaoEquipamento(String descricaoEquipamento) { this.descricaoEquipamento = descricaoEquipamento; }

    public String getCategoriaEquipamento() { return categoriaEquipamento; }
    public void setCategoriaEquipamento(String categoriaEquipamento) { this.categoriaEquipamento = categoriaEquipamento; }

    public String getDescricaoDefeito() { return descricaoDefeito; }
    public void setDescricaoDefeito(String descricaoDefeito) { this.descricaoDefeito = descricaoDefeito; }

    public String getEstado() { return estado; }
    public void setEstado(String estado) { this.estado = estado; }

    public String getClienteCPF() { return clienteCPF; }
    public void setClienteCPF(String clienteCPF) { this.clienteCPF = clienteCPF; }

    public String getClienteNome() { return clienteNome; }
    public void setClienteNome(String clienteNome) { this.clienteNome = clienteNome; }

    public int getFuncionarioID() { return funcionarioID; }
    public void setFuncionarioID(int funcionarioID) { this.funcionarioID = funcionarioID; }

    public double getValorOrcado() { return valorOrcado; }
    public void setValorOrcado(double valorOrcado) { this.valorOrcado = valorOrcado; }

    public Date getDataDePagamento() { return dataDePagamento; }
    public void setDataDePagamento(Date dataDePagamento) { this.dataDePagamento = dataDePagamento; }

    public String getMotivo() { return motivo; }
    public void setMotivo(String motivo) { this.motivo = motivo; }

    public String getDescricaoManutencao() { return descricaoManutencao; }
    public void setDescricaoManutencao(String descricaoManutencao) { this.descricaoManutencao = descricaoManutencao; }

    public String getOrientacoesCliente() { return orientacoesCliente; }
    public void setOrientacoesCliente(String orientacoesCliente) { this.orientacoesCliente = orientacoesCliente; }
}

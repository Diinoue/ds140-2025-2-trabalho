package br.net.razer.reparo.reparo.model;

import java.util.Date;

public class AlteracaoLog {
    private Date data = new Date();
    private int solicitacaoID;
    private String descricao;
    private String tipo;
    private String nomeFuncionario;
    private String nomeFuncionarioRedirecionado;

    // Construtor padrão
    public AlteracaoLog() {
    }

    // Construtor com parâmetros
    public AlteracaoLog(Date data, int solicitacaoID, String descricao, String tipo, String nomeFuncionario, String nomeFuncionarioRedirecionado) {
        this.data = data;
        this.solicitacaoID = solicitacaoID;
        this.descricao = descricao;
        this.tipo = tipo;
        this.nomeFuncionario = nomeFuncionario;
        this.nomeFuncionarioRedirecionado = nomeFuncionarioRedirecionado;
    }

    // Getters e Setters
    public Date getData() {
        return data;
    }

    public void setData(Date data) {
        this.data = data;
    }

    public int getSolicitacaoID() {
        return solicitacaoID;
    }

    public void setSolicitacaoID(int solicitacaoID) {
        this.solicitacaoID = solicitacaoID;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public String getNomeFuncionario() {
        return nomeFuncionario;
    }

    public void setNomeFuncionario(String nomeFuncionario) {
        this.nomeFuncionario = nomeFuncionario;
    }

    public String getNomeFuncionarioRedirecionado() {
        return nomeFuncionarioRedirecionado;
    }

    public void setNomeFuncionarioRedirecionado(String nomeFuncionarioRedirecionado) {
        this.nomeFuncionarioRedirecionado = nomeFuncionarioRedirecionado;
    }
}

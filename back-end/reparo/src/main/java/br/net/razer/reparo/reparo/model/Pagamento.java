package br.net.razer.reparo.reparo.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "tb_pagamento")
public class Pagamento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_pag")
    private Integer id;

    @Column(name = "soli_pag", nullable = false)
    private Integer solicitacaoId; 

    @Column(name = "valor_pag", nullable = false)
    private Double valor;

    @Column(name = "forma_pag", nullable = false, length = 20)
    private String formaPagamento;

    @Column(name = "dt_pagamento",  insertable = false, updatable = false)
    private LocalDateTime dataPagamento;

    public Pagamento() {
        this.dataPagamento = LocalDateTime.now();
    }

    public Pagamento(Integer solicitacaoId, Double valor, String formaPagamento) {
        this.solicitacaoId = solicitacaoId;
        this.valor = valor;
        this.formaPagamento = formaPagamento;
        this.dataPagamento = LocalDateTime.now();
    }

    // Getters e Setters
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public Integer getSolicitacaoId() { return solicitacaoId; }
    public void setSolicitacaoId(Integer solicitacaoId) { this.solicitacaoId = solicitacaoId; }

    public Double getValor() { return valor; }
    public void setValor(Double valor) { this.valor = valor; }

    public String getFormaPagamento() { return formaPagamento; }
    public void setFormaPagamento(String formaPagamento) { this.formaPagamento = formaPagamento; }

    public LocalDateTime getDataPagamento() { return dataPagamento; }
    public void setDataPagamento(LocalDateTime dataPagamento) { this.dataPagamento = dataPagamento; }
}

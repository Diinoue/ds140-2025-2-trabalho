package br.net.razer.reparo.reparo.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

@Entity
@Table(name = "tb_historico")
public class Historico {

        @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_hist")
    private Integer id;

    @Column(name = "soli_hist", nullable = false)
    private Integer solicitacaoId;

    @Column(name = "func_hist", nullable = false)
    private Integer funcionarioId;

    @CreationTimestamp
    @Column(name = "dt_registro", updatable = false)
    private LocalDateTime dataRegistro;

    public Historico() {}

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public Integer getSolicitacaoId() { return solicitacaoId; }
    public void setSolicitacaoId(Integer solicitacaoId) { this.solicitacaoId = solicitacaoId; }

    public Integer getFuncionarioId() { return funcionarioId; }
    public void setFuncionarioId(Integer funcionarioId) { this.funcionarioId = funcionarioId; }

    public LocalDateTime getDataRegistro() { return dataRegistro; }
}

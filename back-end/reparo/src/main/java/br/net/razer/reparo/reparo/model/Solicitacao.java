package br.net.razer.reparo.reparo.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "tb_solicitacao")
public class Solicitacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_soli")
    private Integer id;

    @Column(name = "nome_soli")
    private String nome;

    @Column(name = "dt_inicio", insertable = false, updatable = false)
    private LocalDateTime dataInicio;

    @Column(name = "desc_soli")
    private String descricao;

    @Column(name = "estado_soli", insertable = false, updatable = false)
    private String estado;


    @Column(name = "valor_soli")
    private Double valor;

    @Column(name = "cliente_soli")
    private String clienteSoli;  

    @Column(name = "funcionario_soli")
    private Integer funcionarioId;

    @Column(name = "orientacoe_soli")
    private String orientacoes;

    @Column(name = "eletronico_soli")
    private Integer equipamentoId;

    // Getters e Setters
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public LocalDateTime getDataInicio() { return dataInicio; }
    public void setDataInicio(LocalDateTime dataInicio) { this.dataInicio = dataInicio; }

    public String getDescricao() { return descricao; }
    public void setDescricao(String descricao) { this.descricao = descricao; }

    public String getEstado() { return estado; }
    public void setEstado(String estado) { this.estado = estado; }

    public Double getValor() { return valor; }
    public void setValor(Double valor) { this.valor = valor; }

    public String getClienteSoli() { return clienteSoli; }
    public void setClienteSoli(String clienteSoli) { this.clienteSoli = clienteSoli; }

    public Integer getFuncionarioId() { return funcionarioId; }
    public void setFuncionarioId(Integer funcionarioId) { this.funcionarioId = funcionarioId; }

    public String getOrientacoes() { return orientacoes; }
    public void setOrientacoes(String orientacoes) { this.orientacoes = orientacoes; }

    public Integer getEquipamentoId() { return equipamentoId; }
    public void setEquipamentoId(Integer equipamentoId) { this.equipamentoId = equipamentoId; }
}

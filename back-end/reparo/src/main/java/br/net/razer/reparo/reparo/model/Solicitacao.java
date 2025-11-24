package br.net.razer.reparo.reparo.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "tb_solicitacao")
public class Solicitacao 
{
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

    @Column(name = "ativo_soli", nullable = false)
    private Boolean ativo = true;

    public Solicitacao() {}

    public Solicitacao(String nome, Double valor, String clienteSoli, Integer funcionarioId,Integer equipamentoId, String descricao, String orientacoes,String estado, LocalDateTime dataInicio, Boolean ativo)
    {
        this.nome = nome;
        this.valor = valor;
        this.clienteSoli = clienteSoli;
        this.funcionarioId = funcionarioId;
        this.equipamentoId = equipamentoId;
        this.descricao = descricao;
        this.orientacoes = orientacoes;
        this.estado = estado;
        this.dataInicio = dataInicio;
        this.ativo = ativo;
    }
}

package br.net.razer.reparo.reparo.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;
import org.hibernate.annotations.CreationTimestamp;

@Entity
@Table(name = "tb_solicitacao")
@Getter
@Setter
public class Solicitacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_soli")
    private Integer id;

    @Column(name = "defeito_soli", nullable = false, length = 50)
    private String defeito;

    @CreationTimestamp
    @Column(name = "dt_inicio", nullable = false, updatable = false)
    private LocalDateTime dataInicio;

    @Column(name = "desc_soli", nullable = false, columnDefinition = "TEXT")
    private String descricao;

    @Column(name = "estado_soli", nullable = false)
    private String estado = "ABERTA"; 
    @Column(name = "valor_soli")
    private Double valor;

    @Column(name = "cliente_soli", nullable = false)
    private Integer clienteId;

    @Column(name = "funcionario_soli")
    private Integer funcionarioId;

    @Column(name = "orientacoe_soli", nullable = false, columnDefinition = "TEXT")
    private String orientacoes;

    @Column(name = "eletronico_soli", nullable = false)
    private Integer equipamentoId;

    @Column(name = "ativo_soli", nullable = false)
    private Boolean ativo = true;
}

package br.net.razer.reparo.reparo.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
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

    // Construtor adicional para facilitar criação rápida sem ID e timestamp
    public Historico(Integer solicitacaoId, Integer funcionarioId) {
        this.solicitacaoId = solicitacaoId;
        this.funcionarioId = funcionarioId;
    }
}

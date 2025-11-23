package br.net.razer.reparo.reparo.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "tb_equipamento")
public class Equipamento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_equip")
    private Integer id;

    @Column(name = "nome_equip", nullable = false, unique = true)
    private String nome;

    @Column(name = "ativo_equip", nullable = false)
    private Boolean ativo = true; 

    public Equipamento() {}

    public Equipamento(String nome, Boolean ativo) {
        this.nome = nome;
        this.ativo = ativo;
    }
}

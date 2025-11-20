package br.net.razer.reparo.reparo.model;

import jakarta.persistence.*;

@Entity
@Table(name = "tb_equipamento")
public class Equipamento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_equip")
    private Integer id;

    @Column(name = "nome_equip", nullable = false, unique = true)
    private String nome;

    public Equipamento() {}

    public Equipamento(String nome) {
        this.nome = nome;
    }

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }
}

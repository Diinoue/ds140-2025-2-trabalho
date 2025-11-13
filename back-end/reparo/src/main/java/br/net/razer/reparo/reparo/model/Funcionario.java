package br.net.razer.reparo.reparo.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "tb_funcionario")
public class Funcionario extends Usuario {

@Column(name = "datanasc_func")   
private LocalDate dataNascimento;
    public Funcionario() {}


    public Funcionario(String nome, String senha, String rota, String email, Integer id, LocalDate dataNascimento) {
        super(email, nome, senha, rota, id);
        this.dataNascimento = dataNascimento;
    }

    public LocalDate getDataNascimento() {
        return dataNascimento;
    }

    public void setDataNascimento(LocalDate dataNascimento) {
        this.dataNascimento = dataNascimento;
    }
}


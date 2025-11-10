package br.net.razer.reparo.reparo.model;

import java.time.LocalDate;

public class Funcionario extends Usuario {

    private Integer id;
    private String email;
    private LocalDate dataNascimento;

    public Funcionario() {
    }

    public Funcionario(String nome, String senha, String rota, Integer id, String email, LocalDate dataNascimento) {
        super(nome, senha, rota);
        this.id = id;
        this.email = email;
        this.dataNascimento = dataNascimento;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public LocalDate getDataNascimento() {
        return dataNascimento;
    }

    public void setDataNascimento(LocalDate dataNascimento) {
        this.dataNascimento = dataNascimento;
    }
}

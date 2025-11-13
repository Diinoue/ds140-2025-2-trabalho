package br.net.razer.reparo.reparo.model;

import java.time.LocalDate;

public class Funcionario extends Usuario {

    private LocalDate dataNascimento;

    public Funcionario() {
    }

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

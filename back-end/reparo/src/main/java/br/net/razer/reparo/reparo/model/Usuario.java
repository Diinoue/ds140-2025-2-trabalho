package br.net.razer.reparo.reparo.model;

public class Usuario {
    private String nome;
    private String senha;
    private String rota;

    public Usuario() {
    }

    public Usuario(String nome, String senha, String rota) {
        this.nome = nome;
        this.senha = senha;
        this.rota = rota;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public String getRota() {
        return rota;
    }

    public void setRota(String rota) {
        this.rota = rota;
    }



}

package br.net.razer.reparo.reparo.model;

public class Usuario {
    private Integer id;
    private String nome;
    private String senha;
    private String rota;
    private String email;

    public Usuario() {
    }

    public Usuario(String email, String nome, String senha, String rota, Integer id) {
        this.id = id;
        this.nome = nome;
        this.email = email;
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

}

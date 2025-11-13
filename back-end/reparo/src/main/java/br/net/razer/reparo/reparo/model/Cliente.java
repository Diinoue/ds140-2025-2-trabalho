package br.net.razer.reparo.reparo.model;

public class Cliente extends Usuario {

    private String cpf;
    private String telefone;
    private String endereco;
    private String cep;

    public Cliente() {
    }

    public Cliente(String nome, String senha, String rota, String email, Integer id, String cpf, String telefone, String endereco, String cep){
        super(email, nome, senha, rota, id);
        this.cpf = cpf;
        this.telefone = telefone;
        this.endereco = endereco;
        this.cep = cep;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public String getEndereco() {
        return endereco;
    }

    public void setEndereco(String endereco) {
        this.endereco = endereco;
    }

    
    public String getCEP() {
        return cep;
    }

    public void setCEP(String cep) {
        this.cep = cep;
    }
}

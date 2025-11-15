package br.net.razer.reparo.reparo.model;

import jakarta.persistence.*;

@Entity
@Table(name = "tb_cliente")
@AttributeOverrides({
    @AttributeOverride(name = "id", column = @Column(name = "id_cli")),
    @AttributeOverride(name = "nome", column = @Column(name = "nome_cli")),
    @AttributeOverride(name = "senha", column = @Column(name = "senha_cli")),
    @AttributeOverride(name = "rota", column = @Column(name = "rota_cli")),
    @AttributeOverride(name = "email", column = @Column(name = "email_cli"))
})
public class Cliente extends Usuario {

    @Column(name = "cpf_cli")
    private String cpf;

    @Column(name = "telefone_cli")
    private String telefone;

    @Column(name = "endereco_cli")
    private String endereco;

    @Column(name = "cep_cli")
    private String cep;

    public Cliente() {}

  public Cliente(String email, String nome, String senha, String rota, Integer id,
               String cpf, String telefone, String endereco, String cep) {

    super(email, nome, senha, rota, id);
    this.cpf = cpf;
    this.telefone = telefone;
    this.endereco = endereco;
    this.cep = cep;
}
    public String getCpf() { return cpf; }
    public void setCpf(String cpf) { this.cpf = cpf; }

    public String getTelefone() { return telefone; }
    public void setTelefone(String telefone) { this.telefone = telefone; }

    public String getEndereco() { return endereco; }
    public void setEndereco(String endereco) { this.endereco = endereco; }

    public String getCep() { return cep; }
    public void setCep(String cep) { this.cep = cep; }
}

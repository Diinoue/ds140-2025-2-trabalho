package br.net.razer.reparo.reparo.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "tb_cliente")
@AttributeOverrides({
    @AttributeOverride(name = "id", column = @Column(name = "id_cli")),
    @AttributeOverride(name = "nome", column = @Column(name = "nome_cli")),
    @AttributeOverride(name = "email", column = @Column(name = "email_cli")),
    @AttributeOverride(name = "senha", column = @Column(name = "senha_cli")),
    @AttributeOverride(name = "rota", column = @Column(name = "rota_cli")),
    @AttributeOverride(name = "ativo", column = @Column(name = "ativo_cli"))
})
public class Cliente extends Usuario {

    @Column(name = "cpf_cli", nullable = false, unique = true, length = 11)
    private String cpf;

    @Column(name = "telefone_cli", nullable = false, length = 20)
    private String telefone;

    @Column(name = "cep_cli", nullable = false, length = 10)
    private String cep;

    // Relação 1-1 para tabela endereço
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_endereco", referencedColumnName = "id")
    private Endereco endereco;

    public Cliente() {}
    public Cliente(String nome, String email, String senha, String rota, Integer id,boolean ativo, String cpf, String telefone, String cep, Endereco endereco) {
        super(email, nome, senha, rota, id, ativo);
        this.cpf = cpf;
        this.telefone = telefone;
        this.cep = cep;
        this.endereco = endereco;
    }
}

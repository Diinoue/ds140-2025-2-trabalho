package br.net.razer.reparo.reparo.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "tb_funcionario")
@AttributeOverrides({
    @AttributeOverride(name = "id", column = @Column(name = "id_func")),
    @AttributeOverride(name = "nome", column = @Column(name = "nome_func")),
    @AttributeOverride(name = "senha", column = @Column(name = "senha_func")),
    @AttributeOverride(name = "perfil", column = @Column(name = "perfil_func")),
    @AttributeOverride(name = "email", column = @Column(name = "email_func")),
    @AttributeOverride(name = "ativo", column = @Column(name = "ativo_func"))
})
public class Funcionario extends Usuario 
{

    @Column(name = "datanasc_func", nullable = false)
    private LocalDate dataNasc;

    public Funcionario() {}

    public Funcionario(String nome, String senha, String perfil, String email, Integer id, boolean ativo, LocalDate dataNasc) 
    {
        super(email, nome, senha, perfil, id, ativo); 
        this.dataNasc = dataNasc;
    }
}

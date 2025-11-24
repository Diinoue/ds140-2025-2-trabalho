    package br.net.razer.reparo.reparo.model;

    import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
    import jakarta.persistence.Entity;
    import jakarta.persistence.GeneratedValue;
    import jakarta.persistence.GenerationType;
    import jakarta.persistence.Id;
    import jakarta.persistence.OneToMany;
    import jakarta.persistence.Table;
    import lombok.AllArgsConstructor;
    import lombok.Getter;
    import lombok.NoArgsConstructor;
    import lombok.Setter;


    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor

    @Entity
    @Table(name = "endereco")
    public class Endereco {

        // Não precisa ter JoinColumn, quem possuir
        // primari key que usa JoinColumn. Nesse caso, cliente
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Column(name="id")
        private Integer id;

        @Column(name = "cep_cli", nullable = false, length = 10, unique = true)
        private String cep;        

        // Linka a relação 1-M de Endereço para cliente
        @OneToMany(mappedBy ="endereco")
        @JsonIgnore
        private Set<Cliente> clientes;

        @Column(name="logradouro")
        private String logradouro;

        @Column(name="bairro")
        private String bairro;

        @Column(name="cidade")
        private String cidade;

        @Column(name="uf")
        private String uf;
    }

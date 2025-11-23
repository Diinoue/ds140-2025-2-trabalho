package br.net.razer.reparo.reparo.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.net.razer.reparo.reparo.model.Endereco;

@Repository
public interface EnderecoRepository extends JpaRepository<Endereco, Integer> 
{}

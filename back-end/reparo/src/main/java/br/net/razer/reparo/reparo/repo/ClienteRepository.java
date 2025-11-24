package br.net.razer.reparo.reparo.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import br.net.razer.reparo.reparo.model.Cliente;
import java.util.Optional;
import java.util.List;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Integer> {

    Cliente findByEmail(String email);

    Optional<Cliente> findByIdAndAtivoTrue(Integer id);

    List<Cliente> findByAtivoTrue();

    Optional<Cliente> findByEmailAndAtivoTrue(String email);
}

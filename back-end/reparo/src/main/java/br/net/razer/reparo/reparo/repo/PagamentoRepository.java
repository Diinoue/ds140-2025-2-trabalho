package br.net.razer.reparo.reparo.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import br.net.razer.reparo.reparo.model.Pagamento;

public interface PagamentoRepository extends JpaRepository<Pagamento, Integer> {

}

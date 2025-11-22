package br.net.razer.reparo.reparo.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import br.net.razer.reparo.reparo.model.Historico;
import java.util.List;

public interface HistoricoRepository extends JpaRepository<Historico, Integer> {

    List<Historico> findBySolicitacaoId(Integer soliId);

    List<Historico> findByFuncionarioId(Integer funcId);
}

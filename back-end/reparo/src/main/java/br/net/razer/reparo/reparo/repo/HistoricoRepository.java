package br.net.razer.reparo.reparo.repo;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import br.net.razer.reparo.reparo.model.Historico;

@Repository
public interface HistoricoRepository extends JpaRepository<Historico, Integer> 
{
    List<Historico> findBySolicitacaoId(Integer soliId);
    List<Historico> findByFuncionarioId(Integer funcId);
    Optional<Historico> findBySolicitacaoIdAndFuncionarioId(Integer soliId, Integer funcId);
}

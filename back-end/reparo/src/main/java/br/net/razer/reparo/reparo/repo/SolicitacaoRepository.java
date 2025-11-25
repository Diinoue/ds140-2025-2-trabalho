package br.net.razer.reparo.reparo.repo;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import br.net.razer.reparo.reparo.model.Solicitacao;

@Repository
public interface SolicitacaoRepository extends JpaRepository<Solicitacao, Integer> {

    List<Solicitacao> findByClienteIdAndAtivoTrue(Integer clienteId);

    List<Solicitacao> findByAtivoTrue();

    Optional<Solicitacao> findByIdAndAtivoTrue(Integer id);

    List<Solicitacao> findByFuncionarioIdAndAtivoTrue(Integer funcionarioId);

    List<Solicitacao> findByEquipamentoIdAndAtivoTrue(Integer equipamentoId);

    List<Solicitacao> findByEstadoAndAtivoTrue(String estado);
}

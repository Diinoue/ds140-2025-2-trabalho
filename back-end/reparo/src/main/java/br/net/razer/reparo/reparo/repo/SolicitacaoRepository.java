package br.net.razer.reparo.reparo.repo;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import br.net.razer.reparo.reparo.model.Solicitacao;

@Repository
public interface SolicitacaoRepository extends JpaRepository<Solicitacao, Integer> 
{
    List<Solicitacao> findByClienteSoliAndAtivoTrue(String clienteSoli);
    List<Solicitacao> findByAtivoTrue();
    Optional<Solicitacao> findByIdAndAtivoTrue(Integer id);
}

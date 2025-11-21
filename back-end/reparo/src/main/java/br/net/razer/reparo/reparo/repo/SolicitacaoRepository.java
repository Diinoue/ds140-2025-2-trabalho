package br.net.razer.reparo.reparo.repo;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import br.net.razer.reparo.reparo.model.Solicitacao;

public interface SolicitacaoRepository extends JpaRepository<Solicitacao, Integer> {
    List<Solicitacao> findByClienteSoli(String clienteSoli);
}

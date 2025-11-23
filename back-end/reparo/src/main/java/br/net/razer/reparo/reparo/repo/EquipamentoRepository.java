package br.net.razer.reparo.reparo.repo;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import br.net.razer.reparo.reparo.model.Equipamento;

@Repository
public interface EquipamentoRepository extends JpaRepository<Equipamento, Integer> 
{
    Equipamento findByNome(String nome);
    List<Equipamento> findByAtivoTrue(); 
    Optional<Equipamento> findByIdAndAtivoTrue(Integer id); 
}

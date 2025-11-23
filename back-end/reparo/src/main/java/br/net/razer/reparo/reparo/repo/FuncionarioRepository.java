package br.net.razer.reparo.reparo.repo;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import br.net.razer.reparo.reparo.model.Funcionario;

@Repository
public interface FuncionarioRepository extends JpaRepository<Funcionario, Integer> 
{
    Funcionario findByEmail(String email);
     List<Funcionario> findByAtivoTrue();
}

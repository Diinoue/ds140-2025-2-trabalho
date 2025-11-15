package br.net.razer.reparo.reparo.rest;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import br.net.razer.reparo.reparo.model.Funcionario;
import br.net.razer.reparo.reparo.repo.FuncionarioRepository;

@CrossOrigin
@RestController
@RequestMapping("/funcionarios")
public class FuncionarioREST {

    @Autowired
    private FuncionarioRepository repo;

    private static final List<String> ROTAS_VALIDAS = Arrays.asList("funcionario");

    @GetMapping
    public ResponseEntity<List<Funcionario>> obterTodos() {
        List<Funcionario> funcionarios = repo.findAll();
        if (funcionarios.isEmpty())
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        return ResponseEntity.ok(funcionarios);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Funcionario> obterPorId(@PathVariable int id) {
        Optional<Funcionario> func = repo.findById(id);
        return func.map(ResponseEntity::ok)
                   .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @PostMapping
    public ResponseEntity<?> inserir(@RequestBody Funcionario funcionario) {
        
        String rota = funcionario.getRota();
        if (rota == null || !ROTAS_VALIDAS.contains(rota.toLowerCase())) {
            String mensagemErro = "Rota não permitida. O campo 'rota' deve ser 'funcionario'.";
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(mensagemErro);
        }
        
        if (repo.findByEmail(funcionario.getEmail()) != null)
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
            
        Funcionario novo = repo.save(funcionario);
        return ResponseEntity.status(HttpStatus.CREATED).body(novo);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> alterar(@PathVariable int id, @RequestBody Funcionario funcionario) {
        
        String rota = funcionario.getRota();
        if (rota == null || !ROTAS_VALIDAS.contains(rota.toLowerCase())) {
            String mensagemErro = "Rota inválida. O campo 'rota' deve ser 'funcionario'";
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(mensagemErro);
        }
        
        if (!repo.existsById(id))
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            
        funcionario.setId(id);
        Funcionario atualizado = repo.save(funcionario);
        return ResponseEntity.ok(atualizado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> remover(@PathVariable int id) {
        if (!repo.existsById(id))
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        repo.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
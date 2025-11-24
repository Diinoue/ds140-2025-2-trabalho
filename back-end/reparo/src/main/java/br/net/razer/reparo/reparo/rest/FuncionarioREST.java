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

    private static final List<String> PERFIS_VALIDOS = Arrays.asList("funcionario");

    @GetMapping
    public ResponseEntity<List<Funcionario>> obterTodos() {
        List<Funcionario> funcionarios = repo.findByAtivoTrue();   
        if (funcionarios.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }
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
        String perfil = funcionario.getPerfil();
        if (perfil == null || !PERFIS_VALIDOS.contains(perfil.toLowerCase())) {
            String mensagemErro = "O campo 'perfil' deve ser 'funcionario'.";
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(mensagemErro);
        }
        
        if (repo.findByEmail(funcionario.getEmail()) != null) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Email já cadastrado.");
        }
            
        Funcionario novo = repo.save(funcionario);
        return ResponseEntity.status(HttpStatus.CREATED).body(novo);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> alterar(@PathVariable int id, @RequestBody Funcionario funcionario) {
        Optional<Funcionario> existenteOpt = repo.findById(id);
        if (existenteOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Funcionário " + id + " não encontrado.");
        }

        Funcionario existente = existenteOpt.get();

        Funcionario outroComMesmoEmail = repo.findByEmail(funcionario.getEmail());
        if (outroComMesmoEmail != null && !outroComMesmoEmail.getId().equals(id)) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Email já em uso.");
        }

        existente.setEmail(funcionario.getEmail() != null ? funcionario.getEmail() : existente.getEmail());
        existente.setNome(funcionario.getNome() != null ? funcionario.getNome() : existente.getNome());
        existente.setSenha(funcionario.getSenha() != null ? funcionario.getSenha() : existente.getSenha());
        existente.setDataNasc(funcionario.getDataNasc() != null ? funcionario.getDataNasc() : existente.getDataNasc());
        existente.setPerfil(funcionario.getPerfil() != null ? funcionario.getPerfil() : existente.getPerfil());

        Funcionario atualizado = repo.save(existente);
        return ResponseEntity.ok(atualizado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> desabilitar(@PathVariable int id) {
        if (!repo.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); 
        }

        Funcionario funcionario = repo.findById(id).get();
        funcionario.setAtivo(false);
        repo.save(funcionario);

        return ResponseEntity.noContent().build();
    }
}

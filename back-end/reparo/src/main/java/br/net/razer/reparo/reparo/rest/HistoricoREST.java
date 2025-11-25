package br.net.razer.reparo.reparo.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import br.net.razer.reparo.reparo.model.Historico;
import br.net.razer.reparo.reparo.repo.HistoricoRepository;

import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/historicos")
public class HistoricoREST {

    @Autowired
    private HistoricoRepository repo;

    @GetMapping
    public ResponseEntity<List<Historico>> obterTodos() {
        List<Historico> historicos = repo.findAll();
        if (historicos.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }
        return ResponseEntity.ok(historicos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Historico> obterPorId(@PathVariable int id) {
        Optional<Historico> historico = repo.findById(id);
        return historico.map(ResponseEntity::ok).orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @GetMapping("/solicitacao/{id}")
    public ResponseEntity<List<Historico>> obterPorSolicitacao(@PathVariable int id) {
        List<Historico> historicos = repo.findBySolicitacaoId(id);
        if (historicos.isEmpty()) 
        {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }
        return ResponseEntity.ok(historicos);
    }

    @GetMapping("/funcionario/{id}")
    public ResponseEntity<List<Historico>> obterPorFuncionario(@PathVariable int id) {
        List<Historico> historicos = repo.findByFuncionarioId(id);
        if (historicos.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }
        return ResponseEntity.ok(historicos);
    }

    @PostMapping
    public ResponseEntity<?> inserir(@RequestBody Historico historico) {
        if (historico.getSolicitacaoId() == null || historico.getFuncionarioId() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Campos 'solicitacaoId' e 'funcionarioId' são obrigatórios.");
        }

        Historico novo = repo.save(historico);
        return ResponseEntity.status(HttpStatus.CREATED).body(novo);
    }

}

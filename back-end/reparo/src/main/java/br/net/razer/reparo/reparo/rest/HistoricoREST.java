package br.net.razer.reparo.reparo.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import br.net.razer.reparo.reparo.model.Historico;
import br.net.razer.reparo.reparo.repo.HistoricoRepository;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/historicos")
public class HistoricoREST {

    @Autowired
    private HistoricoRepository historicoRepo;

    // GET - todos
    @GetMapping
    public ResponseEntity<List<Historico>> listarTodos() {
        List<Historico> lista = historicoRepo.findAll();
        if (lista.isEmpty()) return ResponseEntity.noContent().build();
        return ResponseEntity.ok(lista);
    }

    // GET por id
    @GetMapping("/{id}")
    public ResponseEntity<Historico> buscarPorId(@PathVariable int id) {
        return historicoRepo.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // GET por solicitação
    @GetMapping("/solicitacao/{id}")
    public ResponseEntity<List<Historico>> porSolicitacao(@PathVariable int id) {
        List<Historico> lista = historicoRepo.findBySolicitacaoId(id);
        if (lista.isEmpty()) return ResponseEntity.noContent().build();
        return ResponseEntity.ok(lista);
    }

    // GET por funcionário
    @GetMapping("/funcionario/{id}")
    public ResponseEntity<List<Historico>> porFuncionario(@PathVariable int id) {
        List<Historico> lista = historicoRepo.findByFuncionarioId(id);
        if (lista.isEmpty()) return ResponseEntity.noContent().build();
        return ResponseEntity.ok(lista);
    }

    // POST
    @PostMapping
    public ResponseEntity<Historico> criar(@RequestBody Historico h) {
        Historico salvo = historicoRepo.save(h);
        return ResponseEntity.status(HttpStatus.CREATED).body(salvo);
    }
}

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
        return historicos.isEmpty()
                ? ResponseEntity.status(HttpStatus.NO_CONTENT).build()
                : ResponseEntity.ok(historicos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Historico> obterPorId(@PathVariable int id) {
        Optional<Historico> historico = repo.findById(id);
        return historico.map(ResponseEntity::ok)
                        .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @GetMapping("/solicitacao/{id}")
    public ResponseEntity<List<Historico>> obterPorSolicitacao(@PathVariable int id) {
        List<Historico> historicos = repo.findBySolicitacaoId(id);
        return historicos.isEmpty()
                ? ResponseEntity.status(HttpStatus.NO_CONTENT).build()
                : ResponseEntity.ok(historicos);
    }

    @GetMapping("/funcionario/{id}")
    public ResponseEntity<List<Historico>> obterPorFuncionario(@PathVariable int id) {
        List<Historico> historicos = repo.findByFuncionarioId(id);
        return historicos.isEmpty()
                ? ResponseEntity.status(HttpStatus.NO_CONTENT).build()
                : ResponseEntity.ok(historicos);
    }

    @PostMapping
    public ResponseEntity<?> inserir(@RequestBody Historico historico) {
        if (historico.getSolicitacaoId() == null || historico.getFuncionarioId() == null ||
            historico.getDescricao() == null || historico.getTipo() == null ||
            historico.getNomeFuncionario() == null) {
            return ResponseEntity.badRequest()
                    .body("Campos obrigatórios: solicitacaoId, funcionarioId, descricao, tipo, nomeFuncionario.");
        }

        Historico novo = repo.save(historico);
        return ResponseEntity.status(HttpStatus.CREATED).body(novo);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> alterar(@PathVariable int id, @RequestBody Historico historico) {
        Optional<Historico> existenteOpt = repo.findById(id);
        if (existenteOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Histórico " + id + " não encontrado.");
        }

        Historico existente = existenteOpt.get();

        existente.setDescricao(historico.getDescricao() != null ? historico.getDescricao() : existente.getDescricao());
        existente.setTipo(historico.getTipo() != null ? historico.getTipo() : existente.getTipo());
        existente.setNomeFuncionario(historico.getNomeFuncionario() != null ? historico.getNomeFuncionario() : existente.getNomeFuncionario());

        Historico atualizado = repo.save(existente);
        return ResponseEntity.ok(atualizado);
    }

}

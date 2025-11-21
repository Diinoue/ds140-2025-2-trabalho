package br.net.razer.reparo.reparo.rest;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import br.net.razer.reparo.reparo.model.Solicitacao;
import br.net.razer.reparo.reparo.repo.SolicitacaoRepository;

@CrossOrigin
@RestController
@RequestMapping("/solicitacoes")
public class SolicitacaoREST {

    @Autowired
    private SolicitacaoRepository solicitacaoRepo;

    // GET - todas
    @GetMapping
    public ResponseEntity<List<Solicitacao>> listarTodas() {
        List<Solicitacao> lista = solicitacaoRepo.findAll();
        if (lista.isEmpty())
            return ResponseEntity.noContent().build();
        return ResponseEntity.ok(lista);
    }

    // GET - por ID
    @GetMapping("/{id}")
    public ResponseEntity<Solicitacao> buscarPorId(@PathVariable int id) {
        return solicitacaoRepo.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // GET - por CPF do cliente
    @GetMapping("/cliente/{cpf}")
    public ResponseEntity<List<Solicitacao>> obterPorCliente(@PathVariable String cpf) {

        List<Solicitacao> lista = solicitacaoRepo.findByClienteSoli(cpf);

        if (lista.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }

        return ResponseEntity.ok(lista);
    }

    // POST
    @PostMapping
    public ResponseEntity<Solicitacao> criar(@RequestBody Solicitacao solic) {
        Solicitacao salva = solicitacaoRepo.save(solic);
        return ResponseEntity.status(HttpStatus.CREATED).body(salva);
    }

    // PUT
    @PutMapping("/{id}")
    public ResponseEntity<Solicitacao> atualizar(@PathVariable int id, @RequestBody Solicitacao nova) {
        return solicitacaoRepo.findById(id)
                .map(existente -> {
                    nova.setId(id);
                    return ResponseEntity.ok(solicitacaoRepo.save(nova));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<?> remover(@PathVariable int id) {
        return solicitacaoRepo.findById(id)
                .map(s -> {
                    solicitacaoRepo.delete(s);
                    return ResponseEntity.ok().build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}

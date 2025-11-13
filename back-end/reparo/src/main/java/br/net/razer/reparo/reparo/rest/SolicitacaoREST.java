package br.net.razer.reparo.reparo.rest;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import br.net.razer.reparo.reparo.model.Solicitacao;

@CrossOrigin
@RestController
public class SolicitacaoREST {

    private static List<Solicitacao> solicitacoes = new ArrayList<>();
    @GetMapping("/solicitacoes")
    public ResponseEntity<List<Solicitacao>> obterTodas() {
        if (solicitacoes.isEmpty())
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        return ResponseEntity.ok(solicitacoes);
    }

    @PostMapping("/solicitacoes")
    public ResponseEntity<Solicitacao> criar(@RequestBody Solicitacao solicitacao) {
        Solicitacao ultima = solicitacoes.stream()
                .max(Comparator.comparing(Solicitacao::getId))
                .orElse(null);

        if (ultima == null)
            solicitacao.setId(1);
        else
            solicitacao.setId(ultima.getId() + 1);

        solicitacoes.add(solicitacao);
        return ResponseEntity.status(HttpStatus.CREATED).body(solicitacao);
    }

    @GetMapping("/solicitacoes/{id}")
    public ResponseEntity<Solicitacao> obterPorId(@PathVariable int id) {
        Solicitacao s = solicitacoes.stream().filter(x -> x.getId() == id).findAny().orElse(null);
        if (s == null)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        return ResponseEntity.ok(s);
    }

    //IMPLEMENTAR A LOGICA DESSA SERIVE, DEVE RETORNAR TODAS AS SOLICITACOES DE UM CLIENTE EM ESPECIFICO
    @GetMapping("/solicitacoes/cliente/{id}")
    public ResponseEntity<Solicitacao> obterPorCliente(@PathVariable int id) {
        Solicitacao s = solicitacoes.stream().filter(x -> x.getId() == id).findAny().orElse(null);
        if (s == null)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        return ResponseEntity.ok(s);
    }

    @PutMapping("/solicitacoes/{id}")
    public ResponseEntity<Solicitacao> atualizar(@PathVariable int id, @RequestBody Solicitacao solicitacao) {
        Solicitacao existente = solicitacoes.stream().filter(x -> x.getId() == id).findAny().orElse(null);
        if (existente == null)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();

        solicitacoes.remove(existente);
        solicitacao.setId(id);
        solicitacoes.add(solicitacao);
        return ResponseEntity.ok(solicitacao);
    }

    @DeleteMapping("/solicitacoes/{id}")
    public ResponseEntity<Solicitacao> remover(@PathVariable int id) {
        Solicitacao existente = solicitacoes.stream().filter(x -> x.getId() == id).findAny().orElse(null);
        if (existente == null)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();

        solicitacoes.remove(existente);
        return ResponseEntity.ok(existente);
    }
}

package br.net.razer.reparo.reparo.rest;

import java.util.List;
import java.util.Optional;
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
    private SolicitacaoRepository repo;

    @GetMapping
    public ResponseEntity<List<Solicitacao>> listarTodas() {
        List<Solicitacao> lista = repo.findByAtivoTrue();
        return lista.isEmpty() ? ResponseEntity.noContent().build() : ResponseEntity.ok(lista);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Solicitacao> buscarPorId(@PathVariable int id) {
        return repo.findByIdAndAtivoTrue(id)
                   .map(ResponseEntity::ok)
                   .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @GetMapping("/cliente/{idCliente}")
    public ResponseEntity<List<Solicitacao>> obterPorCliente(@PathVariable Integer idCliente) {
        List<Solicitacao> lista = repo.findByClienteIdAndAtivoTrue(idCliente);
        return lista.isEmpty() ? ResponseEntity.noContent().build() : ResponseEntity.ok(lista);
    }

    @GetMapping("/funcionario/{idFuncionario}")
    public ResponseEntity<List<Solicitacao>> obterPorFuncionario(@PathVariable Integer idFuncionario) {
        List<Solicitacao> lista = repo.findByFuncionarioIdAndAtivoTrue(idFuncionario);
        return lista.isEmpty() ? ResponseEntity.noContent().build() : ResponseEntity.ok(lista);
    }

    @GetMapping("/equipamento/{idEquipamento}")
    public ResponseEntity<List<Solicitacao>> obterPorEquipamento(@PathVariable Integer idEquipamento) {
        List<Solicitacao> lista = repo.findByEquipamentoIdAndAtivoTrue(idEquipamento);
        return lista.isEmpty() ? ResponseEntity.noContent().build() : ResponseEntity.ok(lista);
    }

   
    //  ABERTA, ORCADA, REJEITADA, APROVADA, REDIRECIONADA, ARRUMADA, PAGA, FINALIZADA
    @GetMapping("/estado/{estado}")
    public ResponseEntity<List<Solicitacao>> obterPorEstado(@PathVariable String estado) {
        List<Solicitacao> lista = repo.findByEstadoAndAtivoTrue(estado.toUpperCase());
        return lista.isEmpty() ? ResponseEntity.noContent().build() : ResponseEntity.ok(lista);
    }

    @PostMapping
    public ResponseEntity<Solicitacao> criar(@RequestBody Solicitacao solic) {
        solic.setAtivo(true);
        Solicitacao salva = repo.save(solic);
        return ResponseEntity.status(HttpStatus.CREATED).body(salva);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> atualizar(@PathVariable int id, @RequestBody Solicitacao nova) {
        Optional<Solicitacao> existenteOpt = repo.findByIdAndAtivoTrue(id);
        if (existenteOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Solicitação " + id + " não encontrada ou desabilitada.");
        }

        Solicitacao existente = existenteOpt.get();

        existente.setDefeito(nova.getDefeito() != null ? nova.getDefeito() : existente.getDefeito());
        existente.setDescricao(nova.getDescricao() != null ? nova.getDescricao() : existente.getDescricao());
        existente.setValor(nova.getValor() != null ? nova.getValor() : existente.getValor());
        existente.setClienteId(nova.getClienteId() != null ? nova.getClienteId() : existente.getClienteId());
        existente.setFuncionarioId(nova.getFuncionarioId() != null ? nova.getFuncionarioId() : existente.getFuncionarioId());
        existente.setOrientacoes(nova.getOrientacoes() != null ? nova.getOrientacoes() : existente.getOrientacoes());
        existente.setEquipamentoId(nova.getEquipamentoId() != null ? nova.getEquipamentoId() : existente.getEquipamentoId());
        existente.setEstado(nova.getEstado() != null ? nova.getEstado().toUpperCase() : existente.getEstado());

        return ResponseEntity.ok(repo.save(existente));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> desabilitar(@PathVariable int id) {
        Optional<Solicitacao> existenteOpt = repo.findByIdAndAtivoTrue(id);
        if (existenteOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        Solicitacao existente = existenteOpt.get();
        existente.setAtivo(false);
        repo.save(existente);

        return ResponseEntity.noContent().build();
    }
}

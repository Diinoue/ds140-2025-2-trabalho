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
public class SolicitacaoREST 
{

    @Autowired
    private SolicitacaoRepository repo;

    @GetMapping
    public ResponseEntity<List<Solicitacao>> listarTodas() 
    {
        List<Solicitacao> lista = repo.findByAtivoTrue();
        if (lista.isEmpty()) 
        {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }
        return ResponseEntity.ok(lista);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Solicitacao> buscarPorId(@PathVariable int id) 
    {
        Optional<Solicitacao> solic = repo.findByIdAndAtivoTrue(id);
        return solic.map(ResponseEntity::ok)
                    .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @GetMapping("/cliente/{cpf}")
    public ResponseEntity<List<Solicitacao>> obterPorCliente(@PathVariable String cpf)
    {
        List<Solicitacao> lista = repo.findByClienteSoliAndAtivoTrue(cpf);
        if (lista.isEmpty()) 
        {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }
        return ResponseEntity.ok(lista);
    }

    @PostMapping
    public ResponseEntity<Solicitacao> criar(@RequestBody Solicitacao solic) 
    {
        solic.setAtivo(true); 
        Solicitacao salva = repo.save(solic);
        return ResponseEntity.status(HttpStatus.CREATED).body(salva);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> atualizar(@PathVariable int id, @RequestBody Solicitacao nova) {
        Optional<Solicitacao> existenteOpt = repo.findByIdAndAtivoTrue(id);
        if (existenteOpt.isEmpty()) 
        {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Solicitação " + id + " não encontrada ou desabilitada.");
        }

        Solicitacao existente = existenteOpt.get();

        existente.setNome(nova.getNome() != null ? nova.getNome() : existente.getNome());
        existente.setDescricao(nova.getDescricao() != null ? nova.getDescricao() : existente.getDescricao());
        existente.setValor(nova.getValor() != null ? nova.getValor() : existente.getValor());
        existente.setClienteSoli(nova.getClienteSoli() != null ? nova.getClienteSoli() : existente.getClienteSoli());
        existente.setFuncionarioId(nova.getFuncionarioId() != null ? nova.getFuncionarioId() : existente.getFuncionarioId());
        existente.setOrientacoes(nova.getOrientacoes() != null ? nova.getOrientacoes() : existente.getOrientacoes());
        existente.setEquipamentoId(nova.getEquipamentoId() != null ? nova.getEquipamentoId() : existente.getEquipamentoId());
        existente.setEstado(nova.getEstado() != null ? nova.getEstado() : existente.getEstado());

        Solicitacao atualizada = repo.save(existente);
        return ResponseEntity.ok(atualizada);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> desabilitar(@PathVariable int id) 
    {
        Optional<Solicitacao> existenteOpt = repo.findByIdAndAtivoTrue(id);
        if (existenteOpt.isEmpty()) 
        {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        Solicitacao existente = existenteOpt.get();
        existente.setAtivo(false); 
        repo.save(existente);

        return ResponseEntity.noContent().build();
    }
}

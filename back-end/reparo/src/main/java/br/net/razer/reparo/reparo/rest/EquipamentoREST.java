package br.net.razer.reparo.reparo.rest;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import br.net.razer.reparo.reparo.model.Equipamento;
import br.net.razer.reparo.reparo.repo.EquipamentoRepository;

@CrossOrigin
@RestController
@RequestMapping("/equipamentos")
public class EquipamentoREST 
{

    @Autowired
    private EquipamentoRepository repo;

    @GetMapping
    public ResponseEntity<List<Equipamento>> listarTodos() 
    {
        List<Equipamento> equipamentos = repo.findByAtivoTrue(); 
        if (equipamentos.isEmpty())
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        return ResponseEntity.ok(equipamentos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Equipamento> buscarPorId(@PathVariable int id) 
    {
        Optional<Equipamento> equip = repo.findByIdAndAtivoTrue(id); 
        return equip.map(ResponseEntity::ok).orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @PostMapping
    public ResponseEntity<?> inserir(@RequestBody Equipamento equipamento) 
    {
        if (repo.findByNome(equipamento.getNome()) != null)
        {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Equipamento já existe!");
        }
        equipamento.setAtivo(true);
        Equipamento novo = repo.save(equipamento);
        return ResponseEntity.status(HttpStatus.CREATED).body(novo);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> alterar(@PathVariable int id, @RequestBody Equipamento equipamento) 
    {
        Optional<Equipamento> existenteOpt = repo.findByIdAndAtivoTrue(id);
        if (existenteOpt.isEmpty())
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Equipamento " + id + " não encontrado ou desabilitado.");
        Equipamento existente = existenteOpt.get();
        existente.setNome(equipamento.getNome() != null ? equipamento.getNome() : existente.getNome());
        Equipamento atualizado = repo.save(existente);
        return ResponseEntity.ok(atualizado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> desabilitar(@PathVariable int id) {
        Optional<Equipamento> existenteOpt = repo.findByIdAndAtivoTrue(id);
        if (existenteOpt.isEmpty())
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        Equipamento existente = existenteOpt.get();
        existente.setAtivo(false); 
        repo.save(existente);
        return ResponseEntity.noContent().build();
    }
}

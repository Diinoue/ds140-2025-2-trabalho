package br.net.razer.reparo.reparo.rest;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@CrossOrigin
@RestController
public class EquipamentoREST {

    @GetMapping("/equipamentos")
    public ResponseEntity<List<String>> listarTodos() {
        return null;
    }

    @GetMapping("/equipamentos/{id}")
    public ResponseEntity<String> buscarPorId(@PathVariable("id") int id) {
        return null;
    }

    @PostMapping("/equipamentos")
    public ResponseEntity<String> inserir(@RequestBody String equipamento) {
        return null;
    }

    @PutMapping("/equipamentos/{id}")
    public ResponseEntity<String> alterar(@PathVariable("id") String id, @RequestBody String novoEquipamento) {
        return null;
    }

    @DeleteMapping("/equipamentos/{id}")
    public ResponseEntity<String> remover(@PathVariable("id") int id) {
        return null;
    }
}

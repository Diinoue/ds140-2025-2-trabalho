package br.net.razer.reparo.reparo.rest;
import br.net.razer.reparo.reparo.model.Equipamento;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@CrossOrigin
@RestController
public class EquipamentoREST {
// IMPLEMENTAR AINDA
    @GetMapping("/equipamentos")
    public ResponseEntity<Equipamento[]> listarTodos() {
        Equipamento[] equipamentos = {};
        // ACESSAR BANCO DE DADOS
        if (equipamentos.length == 0){
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }
        return ResponseEntity.ok(equipamentos);
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
    public ResponseEntity<String> alterar(@PathVariable("id") Equipamento equipamento) {
        return null;
    }

    @DeleteMapping("/equipamentos/{id}")
    public ResponseEntity<String> remover(@PathVariable("id") int id) {
        return null;
    }
}

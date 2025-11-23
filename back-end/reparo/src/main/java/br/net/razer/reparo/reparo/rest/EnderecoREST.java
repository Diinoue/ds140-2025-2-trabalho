package br.net.razer.reparo.reparo.rest;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.net.razer.reparo.reparo.model.Endereco;
import br.net.razer.reparo.reparo.repo.EnderecoRepository;
import lombok.AllArgsConstructor;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@AllArgsConstructor
@CrossOrigin
@RestController
@RequestMapping("/enderecos")
public class EnderecoREST {

    private EnderecoRepository enderecoRepository;

    @PostMapping
    public ResponseEntity<Endereco> createEndereco(@RequestBody Endereco endereco) {
        Endereco enderecoSalvo = enderecoRepository.save(endereco);
        return new ResponseEntity<>(enderecoSalvo, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Endereco>> getAllEndereco() {
        List<Endereco> enderecos = enderecoRepository.findAll();
        if(enderecos.isEmpty())
        {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }        
    return ResponseEntity.ok(enderecos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Endereco> getEndereco(@PathVariable int id) {
        Optional<Endereco> cli = enderecoRepository.findById(id);
        return cli.map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<?>updateEndereco(@PathVariable int id, @RequestBody Endereco endereco) {
        
        // Validação se não encontrar um endereço contendo tal ID
        if (!enderecoRepository.existsById(id))
        {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        endereco.setId(id);
        Endereco enderecoSalvo = enderecoRepository.save(endereco);
        return ResponseEntity.ok(enderecoSalvo);

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> remover(@PathVariable int id) {
        if (!enderecoRepository.existsById(id))
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            enderecoRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
    
}

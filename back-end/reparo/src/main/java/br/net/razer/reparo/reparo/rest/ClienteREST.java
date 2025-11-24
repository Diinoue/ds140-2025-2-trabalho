package br.net.razer.reparo.reparo.rest;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import br.net.razer.reparo.reparo.model.Cliente;
import br.net.razer.reparo.reparo.model.Endereco;
import br.net.razer.reparo.reparo.repo.ClienteRepository;
import br.net.razer.reparo.reparo.repo.EnderecoRepository;

@CrossOrigin
@RestController
@RequestMapping("/clientes")
public class ClienteREST {

    @Autowired
    private EnderecoRepository enderecoRepository;

    @Autowired
    private ClienteRepository repo;

    // READ ALL
    @GetMapping
    public ResponseEntity<List<Cliente>> obterTodos() {
        List<Cliente> clientes = repo.findByAtivoTrue();
        if (clientes.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }
        return ResponseEntity.ok(clientes);
    }

    // READ ONE
    @GetMapping("/{id}")
    public ResponseEntity<Cliente> obterPorId(@PathVariable int id) {
        Optional<Cliente> cli = repo.findByIdAndAtivoTrue(id);
        return cli.map(ResponseEntity::ok)
                  .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    // CREATE
 @PostMapping
public ResponseEntity<?> inserir(@RequestBody Cliente cliente) {
    if (!"cliente".equalsIgnoreCase(cliente.getPerfil())) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("O campo 'perfil' deve ser 'cliente'.");
    }

    if (repo.findByEmailAndAtivoTrue(cliente.getEmail()).isPresent()) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body("Email já cadastrado.");
    }

    if (cliente.getEndereco() == null || cliente.getEndereco().getId() == null) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Endereço é obrigatório.");
    }

    Endereco enderecoCliente = enderecoRepository.findById(cliente.getEndereco().getId())
            .orElse(null);

    if (enderecoCliente == null) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Endereço não encontrado.");
    }

    cliente.setEndereco(enderecoCliente);

    Cliente novo = repo.save(cliente);
    return ResponseEntity.status(HttpStatus.CREATED).body(novo);
}

    // UPDATE
    @PutMapping("/{id}")
    public ResponseEntity<?> alterar(@PathVariable int id, @RequestBody Cliente cliente) {
        if (!"cliente".equalsIgnoreCase(cliente.getPerfil())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Perfil inválido. O campo 'perfil' deve ser 'cliente'.");
        }

        Optional<Cliente> existenteOpt = repo.findByIdAndAtivoTrue(id);
        if (existenteOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        Endereco enderecoCliente = enderecoRepository.findById(cliente.getEndereco().getId())
                .orElseThrow(() -> new RuntimeException("Endereço não encontrado"));
        cliente.setEndereco(enderecoCliente);

        cliente.setId(id);
        Cliente atualizado = repo.save(cliente);
        return ResponseEntity.ok(atualizado);
    }

    // DELETE (soft delete)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> remover(@PathVariable int id) {
        Optional<Cliente> existenteOpt = repo.findByIdAndAtivoTrue(id);
        if (existenteOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        Cliente cliente = existenteOpt.get();
        cliente.setAtivo(false);
        repo.save(cliente);
        return ResponseEntity.noContent().build();
    }
}

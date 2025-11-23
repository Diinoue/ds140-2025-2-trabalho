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
    

    @GetMapping
    public ResponseEntity<List<Cliente>> obterTodos() {
        List<Cliente> clientes = repo.findAll();
        if (clientes.isEmpty())
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        return ResponseEntity.ok(clientes);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Cliente> obterPorId(@PathVariable int id) {
        Optional<Cliente> cli = repo.findById(id);
        return cli.map(ResponseEntity::ok)
                  .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @PostMapping
    public ResponseEntity<Cliente> inserir(@RequestBody Cliente cliente) {
        if (!"cliente".equalsIgnoreCase(cliente.getRota())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

        if (repo.findByEmail(cliente.getEmail()) != null)
            return ResponseEntity.status(HttpStatus.CONFLICT).build();

        // Carrega o endereço gerenciado pelo JPA
         Endereco enderecoCliente = enderecoRepository.findById(cliente.getEndereco().getId())
                           .orElseThrow(() -> new RuntimeException("Endereço não encontrado"));
                    
        cliente.setEndereco(enderecoCliente);

        Cliente novo = repo.save(cliente);
        return ResponseEntity.status(HttpStatus.CREATED).body(novo);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> alterar(@PathVariable int id, @RequestBody Cliente cliente) {

        if (!"cliente".equalsIgnoreCase(cliente.getRota())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body("Rota inválida. O campo 'rota' deve ser 'cliente'.");
        }

        if (!repo.existsById(id))
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();

        // Carrega o endereço gerenciado pelo JPA
         Endereco enderecoCliente = enderecoRepository.findById(cliente.getEndereco().getId())
                           .orElseThrow(() -> new RuntimeException("Endereço não encontrado"));
            cliente.setEndereco(enderecoCliente);


        cliente.setId(id);
        Cliente atualizado = repo.save(cliente);
        return ResponseEntity.ok(atualizado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> remover(@PathVariable int id) {
        if (!repo.existsById(id))
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        repo.deleteById(id);
        return ResponseEntity.ok().build();
    }
}

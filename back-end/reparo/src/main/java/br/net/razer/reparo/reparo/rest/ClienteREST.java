package br.net.razer.reparo.reparo.rest;

import java.util.ArrayList;
import java.util.List;
import java.util.Comparator;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import br.net.razer.reparo.reparo.model.Cliente;

@CrossOrigin
@RestController
public class ClienteREST {
    //IMPLEMENTAR DO MESMO JEITO QUE O FUNCIONARIO
    //POR ENQUANTO PROVISORIO, MUDAR NA HORA DE IMPLEMENTAR O BANCO DE DADOS

    @GetMapping("/clientes")
    public ResponseEntity<List<Cliente>> obterTodos() {
        List<Cliente> clientes = new ArrayList<>();   // <---------------********** acessar o banco de clientes
        if (clientes.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }
        return ResponseEntity.ok(clientes);
    }

    @GetMapping("/clientes/{id}")
    public ResponseEntity<Cliente> obterPorId(@PathVariable("id") int id) {
        List<Cliente> clientes = new ArrayList<>();   // <---------------********** acessar o banco de clientes

        Cliente cli = clientes.stream().filter(c -> c.getId() == id).findAny().orElse(null);

        if (cli == null)
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        
        else
        return ResponseEntity.ok(cli);
    }

    @PostMapping("/clientes")
    public ResponseEntity<Cliente> inserir(@RequestBody Cliente cliente) {
        List<Cliente> clientes = new ArrayList<>();   // <---------------********** acessar o banco de clientes

        Cliente c = clientes.stream()
                .filter(cli -> cli.getCpf().equals(cliente.getCpf()))
                .findAny()
                .orElse(null);

        if (c != null) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }

        c = clientes.stream().max(Comparator.comparing(Cliente::getId)).orElse(null);

        if (c == null)
            cliente.setId(0);
        else
            cliente.setId(c.getId() + 1);

        clientes.add(cliente);

        return ResponseEntity.status(HttpStatus.CREATED).body(cliente);
    }

    @PutMapping("/clientes/{id}")
    public ResponseEntity<Cliente> alterar(@PathVariable("id") int id, @RequestBody Cliente cliente) {
        List<Cliente> clientes = new ArrayList<>();   // <---------------********** acessar o banco de clientes
        Cliente cli = clientes.stream().filter(c -> c.getId() == id).findAny().orElse(null);

        if (cli != null) {
            cli.setNome(cliente.getNome());
            cli.setCpf(cliente.getCpf());
            cli.setTelefone(cliente.getTelefone());
            cli.setEndereco(cliente.getEndereco());
            cli.setSenha(cliente.getSenha());
            return ResponseEntity.ok(cli);
        } else
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @DeleteMapping("/clientes/{id}")
    public ResponseEntity<Cliente> remover(@PathVariable("id") int id) {
        List<Cliente> clientes = new ArrayList<>();   // <---------------********** acessar o banco de clientes
        Cliente cliente = clientes.stream().filter(c -> c.getId() == id).findAny().orElse(null);

        if (cliente != null) {
            clientes.removeIf(c -> c.getId() == id);
            return ResponseEntity.ok(cliente);
        } else
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
}

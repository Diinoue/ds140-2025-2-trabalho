package br.net.razer.reparo.reparo.rest;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import java.util.Comparator;

import br.net.razer.reparo.reparo.model.Funcionario;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;



@CrossOrigin
@RestController
public class FuncionarioREST {
    
     

    @GetMapping("/funcionarios")
        public ResponseEntity<List<Funcionario>> obterTodos() {
        List<Funcionario> funcionarios = new ArrayList<>();   // <---------------********** acessar o banco de funcionarios
        if (funcionarios.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }

        return ResponseEntity.ok(funcionarios);
    }

    @GetMapping("/funcionarios/{id}")
        public ResponseEntity<Funcionario> obterPorId(@PathVariable("id") int id) {
        List<Funcionario> funcionarios = new ArrayList<>();   // <---------------********** acessar o banco de funcionarios
        Funcionario func = funcionarios.stream().filter(f -> f.getId() == id).findAny().orElse(null);
        
        if (func == null) 
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
        .build();
        
        else
        return ResponseEntity.ok(func);
        }

    @PostMapping("/funcionarios")
        public ResponseEntity<Funcionario> inserir(@RequestBody Funcionario funcionario) {
            List<Funcionario> funcionarios = new ArrayList<>();   // <---------------********** acessar o banco de funcionarios
            Funcionario f = funcionarios.stream()
                .filter(func -> func.getEmail().equals(funcionario.getEmail()))
                .findAny()
                .orElse(null);

            if (f != null) {
                return ResponseEntity.status(HttpStatus.CONFLICT).build();
            }

            f = funcionarios.stream().max(Comparator.comparing(Funcionario::getId))
            .orElse(null);

            if (f == null)
                funcionario.setId(0);
            else
                funcionario.setId(f.getId() + 1);

            funcionarios.add(funcionario);

            return ResponseEntity.status(HttpStatus.CREATED).body(funcionario);
        }

    @PutMapping("/funcionarios/{id}")
        public ResponseEntity<Funcionario> alterar(@PathVariable("id") int id, @RequestBody Funcionario funcionario) {
            List<Funcionario> funcionarios = new ArrayList<>();   // <---------------********** acessar o banco de funcionarios
            Funcionario func = funcionarios.stream().filter(

            f -> f.getId() == id).findAny().orElse(null);

            if (func != null) {
            func.setNome(funcionario.getNome());
            func.setEmail(funcionario.getEmail());
            func.setSenha(funcionario.getSenha());
            func.setDataNascimento(funcionario.getDataNascimento());
            return ResponseEntity.ok(func);
            }
            else
            return ResponseEntity.status(HttpStatus.NOT_FOUND)

            .build();

    }

    @DeleteMapping("/funcionarios/{id}")
    public ResponseEntity<Funcionario> remover(@PathVariable("id") int id) {
        List<Funcionario> funcionarios = new ArrayList<>();   // <---------------********** acessar o banco de funcionarios
        Funcionario funcionario = funcionarios.stream().filter(

        f -> f.getId() == id).findAny().orElse(null);

        if (funcionario != null) {
            funcionarios.removeIf(u -> u.getId() == id);
            return ResponseEntity.ok(funcionario);
        }

        else 
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();

    }

}
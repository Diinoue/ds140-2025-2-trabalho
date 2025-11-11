package br.net.razer.reparo.reparo.rest;

import java.util.ArrayList;
import java.util.List;

import org.apache.el.lang.FunctionMapperFactory;
import org.apache.tomcat.util.http.fileupload.FileUpload;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

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
        // SELECT NO FUNCIONARIO COM ID = "id" NO BANCO DE DADOS
        Funcionario funcionario = new Funcionario(); // <--------

        // SE NAO ACHAR, DEVOLVE NOT_FOUND
        if (funcionario == null) 
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
        .build();
        //SE ACHAR, DEVOLVE FUNCIONARIO ENCONTRADO
        else
        return ResponseEntity.ok(funcionario);
        }

    @PostMapping("/funcionarios")
        public ResponseEntity<Funcionario> inserir(@RequestBody Funcionario funcionario) {
            // SELECT NO FUNCIONARIO COM EMAIL = "funcionario.email" NO BANCO DE DADOS
            Funcionario encontrado = new Funcionario(); // <---------

            if (encontrado != null) {
                // SE ACHAR O FUNCIONARIO, NAO FAZ NADA, E RETORNA STATUS CONFLICT
                return ResponseEntity.status(HttpStatus.CONFLICT).build();
            }
            else {
                // SE NAO ACHAR O FUNCIONARIO NO BANCO, INSERE NO BANCO O NOVO "funcionario"
                return ResponseEntity.status(HttpStatus.CREATED).body(funcionario);
            }
            
        }

    @PutMapping("/funcionarios/{id}")
        public ResponseEntity<Funcionario> alterar(@PathVariable("id") int id, @RequestBody Funcionario funcionario) {
            // SELECT NO FUNCIONARIO COM "id" NO BANCO DE DADOS
            Funcionario func = new Funcionario(); // <<--------

            if (func != null) {
            //SE ACHAR UM FUNCIONARIO, INSERIR AS INFORMACOES ATUALIZADAS DE "funcionario" NO BANCO
            return ResponseEntity.ok(func);
            }
            else
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();

    }

    @DeleteMapping("/funcionarios/{id}")
    public ResponseEntity<Funcionario> remover(@PathVariable("id") int id) {
        // SELECT NO FUNCIONARIO COM "id" NO BANCO DE DADOS
        Funcionario funcionario = new Funcionario();

        if (funcionario != null) {
            //SE ACHAR UM FUNCIONARIO, DELETAR FUNCIONARIO ENCONTRADO NO BANCO
            return ResponseEntity.ok(funcionario);
        }

        else 
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();

    }

}
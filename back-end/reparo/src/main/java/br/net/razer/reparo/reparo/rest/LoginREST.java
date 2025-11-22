package br.net.razer.reparo.reparo.rest;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import br.net.razer.reparo.reparo.model.Login;
import br.net.razer.reparo.reparo.model.Usuario;

// FAZER: Validação no cadasro para evitar usuários repetidos

@CrossOrigin
@RestController
public class LoginREST {

    public static List<Usuario> usuarios = new ArrayList<>(); // <---------------********** acessar o banco de usuarios
    
    @PostMapping("/login")
    public ResponseEntity<Usuario> login(@RequestBody Login login) {

        Usuario encontrado = usuarios.stream()
            .filter(u -> u.getEmail().equals(login.getEmail()) && u.getSenha().equals(login.getSenha()))
            .findAny()
            .orElse(null);

        if (encontrado == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        } else {
            return ResponseEntity.ok(encontrado);
        }
    }

}

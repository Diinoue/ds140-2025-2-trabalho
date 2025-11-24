package br.net.razer.reparo.reparo.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import br.net.razer.reparo.reparo.model.Login;
import br.net.razer.reparo.reparo.model.Usuario;
import br.net.razer.reparo.reparo.model.Funcionario;
import br.net.razer.reparo.reparo.model.Cliente;
import br.net.razer.reparo.reparo.repo.FuncionarioRepository;
import br.net.razer.reparo.reparo.repo.ClienteRepository;

@CrossOrigin
@RestController
@RequestMapping("/login")
public class LoginREST {

    @Autowired
    private FuncionarioRepository funcionarioRepo;

    @Autowired
    private ClienteRepository clienteRepo;

    @PostMapping
    public ResponseEntity<?> login(@RequestBody Login login) {
        Usuario encontrado = null;

        Funcionario func = funcionarioRepo.findByEmail(login.getEmail());
        if (func != null && func.getSenha().equals(login.getSenha()) && Boolean.TRUE.equals(func.getAtivo())) {
            encontrado = func;
        }

        Cliente cli = clienteRepo.findByEmail(login.getEmail());
        if (cli != null && cli.getSenha().equals(login.getSenha()) && Boolean.TRUE.equals(cli.getAtivo())) {
            encontrado = cli;
        }

        if (encontrado == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Email ou senha inválidos.");
        }

        return ResponseEntity.ok(encontrado);
    }
}

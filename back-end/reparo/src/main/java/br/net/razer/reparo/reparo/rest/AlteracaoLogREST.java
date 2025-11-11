package br.net.razer.reparo.reparo.rest;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import br.net.razer.reparo.reparo.model.AlteracaoLog;

@CrossOrigin
@RestController
public class AlteracaoLogREST {
    
    
    // Lista estática para simular um banco de dados
    private static List<AlteracaoLog> logs = new ArrayList<>();

    // Endpoint para retornar todas as alterações
    @GetMapping("/alteracoes")
    public List<AlteracaoLog> listarTodos() {
        return logs;
    }

    // Endpoint para adicionar uma nova alteração
    @PostMapping("/alteracoes")
    public AlteracaoLog adicionar(@RequestBody AlteracaoLog log) {
        logs.add(log);
        return log;
    }

    // Endpoint para buscar logs por ID da solicitação
    @GetMapping("/solicitacao/{id}")
    public List<AlteracaoLog> buscarPorSolicitacao(@PathVariable int id) {
        List<AlteracaoLog> resultado = new ArrayList<>();
        for (AlteracaoLog log : logs) {
            if (log.getSolicitacaoID() == id) {
                resultado.add(log);
            }
        }
        return resultado;
    }

}


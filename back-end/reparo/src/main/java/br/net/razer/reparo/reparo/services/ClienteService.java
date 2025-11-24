package br.net.razer.reparo.reparo.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.net.razer.reparo.reparo.model.Cliente;
import br.net.razer.reparo.reparo.model.Endereco;
import br.net.razer.reparo.reparo.repo.ClienteRepository;
import br.net.razer.reparo.reparo.repo.EnderecoRepository;

@Service
public class ClienteService {

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private EnderecoRepository enderecoRepository;

    public Cliente criarCliente(Cliente cliente) {
        // Validação se já existe endereço com o mesmo CEP
        Optional<Endereco> enderecoExistente = enderecoRepository.findByCep(cliente.getEndereco().getCep());

        if(enderecoExistente.isPresent()) {
            // associação de cliente ao endereço ja existente
            cliente.setEndereco(enderecoExistente.get());
        } else {
            // Criação novo endereço
            Endereco novoEndereco = enderecoRepository.save(cliente.getEndereco());
            cliente.setEndereco(novoEndereco);
        }

        //Salva cliente com o endereco correto
        return clienteRepository.save(cliente);
    }



}

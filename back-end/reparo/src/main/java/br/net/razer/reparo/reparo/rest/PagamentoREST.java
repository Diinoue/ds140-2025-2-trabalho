package br.net.razer.reparo.reparo.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import br.net.razer.reparo.reparo.model.Pagamento;
import br.net.razer.reparo.reparo.repo.PagamentoRepository;

import java.util.List;

@RestController
@RequestMapping("/pagamentos")
public class PagamentoREST {

    @Autowired
    private PagamentoRepository pagamentoRepository;

    @GetMapping
    public List<Pagamento> listarTodos() {
        return pagamentoRepository.findAll();
    }

    @GetMapping("/{id}")
    public Pagamento buscarPorId(@PathVariable Integer id) {
        return pagamentoRepository.findById(id).orElse(null);
    }

    @PostMapping
    public Pagamento criar(@RequestBody Pagamento pagamento) {
        return pagamentoRepository.save(pagamento);
    }

    @PutMapping("/{id}")
    public Pagamento atualizar(@PathVariable Integer id, @RequestBody Pagamento pagamento) {
        pagamento.setId(id);
        return pagamentoRepository.save(pagamento);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Integer id) {
        pagamentoRepository.deleteById(id);
    }
}

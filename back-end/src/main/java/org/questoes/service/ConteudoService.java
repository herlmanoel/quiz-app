package org.questoes.service;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import java.util.List;

import org.questoes.domain.Conteudo;
import org.questoes.domain.repository.ConteudoRepository;

@ApplicationScoped
public class ConteudoService {

    @Inject
    ConteudoRepository conteudoRepository;

    // Método para buscar todos os conteúdos que possuem perguntas
    public List<Conteudo> buscarConteudosComQuestoes() {
        return conteudoRepository.findAllWithQuestoes();
    }
}
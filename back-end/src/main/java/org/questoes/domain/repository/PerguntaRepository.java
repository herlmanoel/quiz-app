package org.questoes.domain.repository;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import org.questoes.domain.Conteudo;
import org.questoes.domain.Pergunta;

import java.util.List;

@ApplicationScoped
public class PerguntaRepository implements PanacheRepository<Pergunta> {

    public List<Pergunta> buscarPorConteudo(Long conteudoId) {
        // Busca as perguntas, alternativas e o conteúdo associado
        return find("select distinct p from Pergunta p left join fetch p.alternativas " +
                "left join fetch p.conteudo where p.conteudo.id = ?1", conteudoId).list();
    }

    public List<Pergunta> buscarPorConteudos(List<Long> conteudoIds) {
        // Busca as perguntas, alternativas e os conteúdos associados
        return find("select distinct p from Pergunta p left join fetch p.alternativas " +
                "left join fetch p.conteudo where p.conteudo.id in (?1)", conteudoIds).list();
    }

    public Pergunta findById(Long id) {
        return find("id", id).firstResult();
    }

}
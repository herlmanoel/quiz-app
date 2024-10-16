package org.questoes.domain.repository;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

import java.util.List;

import org.questoes.domain.Conteudo;

@ApplicationScoped
public class ConteudoRepository implements PanacheRepository<Conteudo> {

    public List<Conteudo> findAllWithQuestoes() {
        return find("select distinct c from Conteudo c " +
                "left join fetch c.perguntas p " +       // Carrega perguntas relacionadas ao conteúdo
                "left join fetch c.subConteudos sc")      // Carrega os subconteúdos
                .list();
    }
}
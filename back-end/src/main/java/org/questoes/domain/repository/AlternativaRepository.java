package org.questoes.domain.repository;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import org.questoes.domain.Alternativa;
import org.questoes.domain.Pergunta;

@ApplicationScoped
public class AlternativaRepository implements PanacheRepository<Alternativa> {
}
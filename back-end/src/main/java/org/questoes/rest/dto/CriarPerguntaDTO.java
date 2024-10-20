package org.questoes.rest.dto;

import java.util.List;

public record CriarPerguntaDTO(Long conteudo,
                               String texto,
                               List<AlternativaDTO> alternativas) {
}

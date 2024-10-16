package org.questoes.rest.dto;

import java.time.LocalDateTime;

public record PerguntaAtualizacaoDTO(
    Long idPergunta,
    boolean respostaCorreta,
    int dificuldade, 
    LocalDateTime ultimaRevisao
) {
    
}

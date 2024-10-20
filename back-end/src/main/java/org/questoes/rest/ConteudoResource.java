package org.questoes.rest;


import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import java.util.List;

import org.questoes.domain.Conteudo;
import org.questoes.service.ConteudoService;

@Path("/conteudos")
@Produces(MediaType.APPLICATION_JSON)
public class ConteudoResource {

    @Inject
    ConteudoService conteudoService;

    // Endpoint para buscar todos os conteúdos que têm perguntas associadas
    @GET
    @Path("/com-questoes")
    public List<Conteudo> buscarConteudosComQuestoes() {
        return conteudoService.buscarConteudosComQuestoes();
    }
}
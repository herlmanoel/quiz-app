package org.questoes.service;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import org.questoes.domain.Alternativa;
import org.questoes.domain.Conteudo;
import org.questoes.domain.Pergunta;
import org.questoes.domain.repository.ConteudoRepository;
import org.questoes.domain.repository.PerguntaRepository;
import org.questoes.rest.dto.AlternativaDTO;
import org.questoes.rest.dto.CriarPerguntaDTO;
import org.questoes.rest.dto.PerguntaAtualizacaoDTO;

import java.util.List;

@ApplicationScoped
public class PerguntaService {

    @Inject
    PerguntaRepository perguntaRepository;

    @Inject
    ConteudoRepository conteudoRepository;

    @Transactional
    public Pergunta criarPergunta(CriarPerguntaDTO perguntaDTO) {
        Conteudo conteudo = conteudoRepository.findById(perguntaDTO.conteudo());

        if (conteudo == null) {
            throw new IllegalArgumentException("Conteúdo não encontrado");
        }

        Pergunta pergunta = new Pergunta(perguntaDTO.texto(), conteudo);

        for (AlternativaDTO alternativaDTO : perguntaDTO.alternativas()) {
            Alternativa alternativa = new Alternativa(alternativaDTO.texto(), alternativaDTO.correta(), pergunta);
            pergunta.alternativas.add(alternativa);
        }

        perguntaRepository.persist(pergunta);

        return pergunta;
    }

    @Transactional
    public void criarPerguntas(List<CriarPerguntaDTO> perguntasDTO) {
        perguntasDTO.forEach(this::criarPergunta);
    }

    public List<Pergunta> buscarPerguntasPorConteudo(Long conteudoId) {
        return perguntaRepository.buscarPorConteudo(conteudoId);
    }

    public List<Pergunta> buscarPerguntasPorConteudos(List<Long> conteudoIds) {
        return perguntaRepository.buscarPorConteudos(conteudoIds);
    }

    public List<Pergunta> getAll() {
        return perguntaRepository.listAll();
    }

    @Transactional
    public void atualizarPerguntas(List<PerguntaAtualizacaoDTO> perguntasAtualizadas) {
        for (PerguntaAtualizacaoDTO dto : perguntasAtualizadas) {
            Pergunta pergunta = perguntaRepository.findById(dto.idPergunta());

            if (pergunta != null) {
                // Atualiza os campos da pergunta
                pergunta.numeroTentativas += 1; // Incrementa as tentativas
                pergunta.ultimaRevisao = dto.ultimaRevisao();
                pergunta.ultimaRespostaCorreta = dto.respostaCorreta();

                if (dto.respostaCorreta()) {
                    pergunta.totalRespostasCorretas += 1;
                } else {
                    pergunta.totalRespostasIncorretas += 1;
                }

                // Atualiza a facilidade e a dificuldade percebida
                pergunta.facilidade = calcularNovaFacilidade(pergunta.facilidade, dto.dificuldade());
                pergunta.ultimaDificuldade = dto.dificuldade();

                // Atualiza o intervalo de revisão com base nas tentativas e na facilidade
                pergunta.intervaloRevisao = calcularNovoIntervalo(pergunta.facilidade, pergunta.numeroTentativas);

                pergunta.estado = "revisao";
            }
        }
    }

    // Função auxiliar para calcular a nova facilidade
    private double calcularNovaFacilidade(double facilidadeAtual, int dificuldade) {
        if (dificuldade > 3) {
            return facilidadeAtual * 0.9; 
        } else {
            return facilidadeAtual * 1.1;
        }
    }

    // Função auxiliar para calcular o novo intervalo de revisão
    private int calcularNovoIntervalo(double facilidade, int numeroTentativas) {
        return (int) Math.round(facilidade * numeroTentativas * 2); // Multiplica pela facilidade e número de tentativas
    }
}

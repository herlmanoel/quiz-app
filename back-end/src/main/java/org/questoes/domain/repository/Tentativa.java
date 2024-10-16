package org.questoes.domain.repository;

import jakarta.persistence.Entity;
import jakarta.persistence.*;
import org.questoes.domain.Pergunta;

import java.time.LocalDateTime;

@Entity
public class Tentativa {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        public Long id;

        @ManyToOne
        @JoinColumn(name = "pergunta_id")
        public Pergunta pergunta;

        public LocalDateTime dataTentativa;
        public boolean correta;  // Se a resposta foi correta ou não

        public int intervaloRepeticao;  // Intervalo atual de repetição em dias
        public int acertosSeguidos;  // Número de acertos consecutivos

        public Tentativa() {}

        public Tentativa(Pergunta pergunta, LocalDateTime dataTentativa, boolean correta, int intervaloRepeticao, int acertosSeguidos) {
            this.pergunta = pergunta;
            this.dataTentativa = dataTentativa;
            this.correta = correta;
            this.intervaloRepeticao = intervaloRepeticao;
            this.acertosSeguidos = acertosSeguidos;
        }

        // Método para calcular o próximo intervalo de repetição baseado no desempenho
        public void ajustarIntervaloDeRepeticao() {
            if (correta) {
                // Se a resposta estiver correta, aumentamos o intervalo
                acertosSeguidos++;
                intervaloRepeticao = calcularNovoIntervalo();
            } else {
                // Se a resposta estiver incorreta, redefinimos o número de acertos seguidos e o intervalo
                acertosSeguidos = 0;
                intervaloRepeticao = 1;  // Redefine o intervalo para 1 dia (ou ajuste conforme necessário)
            }
        }

        // Método para calcular a próxima tentativa com base no intervalo de repetição
        public LocalDateTime calcularProximaTentativa() {
            return this.dataTentativa.plusDays(this.intervaloRepeticao);
        }

        // Implementação simples para aumentar o intervalo de repetição
        private int calcularNovoIntervalo() {
            // Aumenta o intervalo exponencialmente com base nos acertos seguidos
            // Exemplo: acertosSeguidos = 1 => 2 dias, acertosSeguidos = 2 => 4 dias, etc.
            return intervaloRepeticao * (1 + acertosSeguidos);
        }
    }

package org.questoes.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
public class Alternativa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    public String texto;
    public boolean correta;

    // Relação de muitos para um com Pergunta
    @ManyToOne
    @JoinColumn(name = "pergunta_id")
    @JsonBackReference  // Evitar ciclos de referência com a entidade Pergunta
    public Pergunta pergunta;

    public Alternativa() {}

    public Alternativa(String texto, boolean correta, Pergunta pergunta) {
        this.texto = texto;
        this.correta = correta;
        this.pergunta = pergunta;
    }
}

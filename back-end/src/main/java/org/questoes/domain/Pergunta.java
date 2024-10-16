package org.questoes.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import java.util.Set;
import java.time.LocalDateTime;

@Entity
public class Pergunta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    public String texto;

    public LocalDateTime proximaRevisao;
    public int numeroTentativas;
    public LocalDateTime ultimaRevisao;
    public int intervaloRevisao;          
    public double facilidade;             
    public String estado;                 
    public boolean ultimaRespostaCorreta;  
    public int totalRespostasCorretas;     
    public int totalRespostasIncorretas;   
    public int ultimaDificuldade;         

    // Relação de um para muitos com Alternativa
    @OneToMany(mappedBy = "pergunta", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference  // Define que esta é a parte gerenciada da relação na serialização
    public Set<Alternativa> alternativas;

    @ManyToOne
    @JoinColumn(name = "conteudo_id")
    @JsonManagedReference  //  // Definir esta relação para evitar ciclo de referência com Conteúdo
    public Conteudo conteudo;

    public Pergunta() {}

    public Pergunta(String texto, Conteudo conteudo) {
        this.texto = texto;
        this.conteudo = conteudo;
    }

    // Construtor adicional para definir todos os campos, incluindo revisões
    public Pergunta(String texto, Conteudo conteudo, LocalDateTime proximaRevisao, int numeroTentativas,
                    LocalDateTime ultimaRevisao, int intervaloRevisao, double facilidade, String estado,
                    boolean ultimaRespostaCorreta, int totalRespostasCorretas, int totalRespostasIncorretas,
                    int ultimaDificuldade) {
        this.texto = texto;
        this.conteudo = conteudo;
        this.proximaRevisao = proximaRevisao;
        this.numeroTentativas = numeroTentativas;
        this.ultimaRevisao = ultimaRevisao;
        this.intervaloRevisao = intervaloRevisao;
        this.facilidade = facilidade;
        this.estado = estado;
        this.ultimaRespostaCorreta = ultimaRespostaCorreta;
        this.totalRespostasCorretas = totalRespostasCorretas;
        this.totalRespostasIncorretas = totalRespostasIncorretas;
        this.ultimaDificuldade = ultimaDificuldade;
    }
}

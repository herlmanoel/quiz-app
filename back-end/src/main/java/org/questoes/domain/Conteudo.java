package org.questoes.domain;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import java.util.Set;

@Entity
public class Conteudo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    public String titulo;

    // Relacionamento com Pergunta (conteúdo pai de várias perguntas)
    @OneToMany(mappedBy = "conteudo", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonBackReference   // Define essa relação como gerenciada na serialização
    public Set<Pergunta> perguntas;

    // Relacionamento com subconteúdos (conteúdo pai de vários subconteúdos)
    @OneToMany(mappedBy = "conteudoPai", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference  // Gerenciado na serialização
    public Set<Conteudo> subConteudos;

    // Relacionamento com o conteúdo pai
    @ManyToOne
    @JoinColumn(name = "conteudo_pai_id")
    @JsonBackReference  // Define essa relação como o lado que não será serializado diretamente
    public Conteudo conteudoPai;

    public Conteudo() {}

    public Conteudo(String titulo) {
        this.titulo = titulo;
    }
}

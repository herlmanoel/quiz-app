// src/types.ts

export type Alternativa = {
    texto: string;
    correta: boolean;
  }
  
  export type Questao = {
    id: number;
    conteudo_id: number;
    pergunta: string;
    alternativas: Alternativa[];
    proximaRevisao: Date;
    numeroTentativas: number;
    ultimaRevisao: Date;
    intervaloRevisao: number;
    facilidade: number;
    estado: string;
    ultimaRespostaCorreta: boolean;
    totalRespostasCorretas: number;
    totalRespostasIncorretas: number;
    ultimaDificuldade: number;
  }
  
  export type Conteudo = {
    id: number;
    nome: string;
    descricao: string;
    sub_topicos: Conteudo[];
  }
  
  export type QuizProps = {
    questoes: Questao[];
  }
  
  // src/types.ts
export type Filtro = 'todas' | 'novas' | 'revisar' | 'erradas';
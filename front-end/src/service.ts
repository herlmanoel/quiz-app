import { Alternativa, Questao } from "./types";

  
  export interface Conteudo {
    id: number;
    nome: string;
    descricao: string;
    sub_topicos: number[];
  }
  
  // Função para embaralhar um array
  function embaralharArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Troca os elementos
    }
    return array;
  }
  
  // Função para embaralhar as questões e suas alternativas
  function embaralharQuestoesEAlternativas(questoes: Questao[]): Questao[] {
    const questoesEmbaralhadas = embaralharArray(questoes);
  
    return questoesEmbaralhadas.map((questao) => ({
      ...questao,
      alternativas: embaralharArray(questao.alternativas),
    }));
  }
  
  // Função para adicionar a alternativa "Não sei" a cada questão
  function adicionarAlternativaNaoSei(questoes: Questao[]): Questao[] {
    return questoes.map((questao) => ({
      ...questao,
      alternativas: [
        ...questao.alternativas,
        {
          texto: 'Não sei',
          correta: false,
        },
      ],
    }));
  }
  
  // Função para buscar as questões da API e processá-las
  export async function buscarQuestoes(): Promise<Questao[]> {
    try {
      const response = await fetch('http://localhost:8080/perguntas');  // Substitua pela URL da sua API
      console.log(response);
      if (!response.ok) {
        throw new Error('Erro ao buscar as questões');
      }
  
      // Transformando o resultado da API para o formato esperado
      const questoes = await response.json();
      console.log('Resposta da API:', questoes);  // Logando a resposta para inspeção
  
      // Mapeando os dados da API para o formato esperado pelo frontend
      const questoesMapeadas: Questao[] = questoes.map((q: any) => ({
        id: q.id,
        conteudo_id: q.conteudo ? q.conteudo.id : null,  // Verifica se 'conteudo' existe antes de acessar 'conteudo.id'
        pergunta: q.texto,  // O texto da pergunta
        alternativas: q.alternativas ? q.alternativas.map((alt: any): Alternativa => ({
          texto: alt.texto,
          correta: alt.correta
        })) : [],  // Verifica se 'alternativas' existe e evita erro caso seja undefined
        proximaRevisao: q.proximaRevisao ? new Date(q.proximaRevisao) : null,  // Converte string para Date
        numeroTentativas: q.numeroTentativas,
        ultimaRevisao: q.ultimaRevisao ? new Date(q.ultimaRevisao) : null,  // Converte string para Date
        intervaloRevisao: q.intervaloRevisao,
        facilidade: q.facilidade,
        estado: q.estado,
        ultimaRespostaCorreta: q.ultimaRespostaCorreta,
        totalRespostasCorretas: q.totalRespostasCorretas,
        totalRespostasIncorretas: q.totalRespostasIncorretas,
        ultimaDificuldade: q.ultimaDificuldade
      }));
  
      // Embaralhar as questões e adicionar a alternativa "Não sei"
      const questoesEmbaralhadas = embaralharQuestoesEAlternativas(questoesMapeadas);
      const questoesComNaoSei = adicionarAlternativaNaoSei(questoesEmbaralhadas);
  
      return questoesComNaoSei;
    } catch (error) {
      console.error(error);
      throw error;  // Repropaga o erro para o componente lidar com ele
    }
  }
  


// Função para buscar os conteúdos da API e processá-los, incluindo subconteúdos
export async function buscarConteudos(): Promise<Conteudo[]> {
    try {
      const response = await fetch('http://localhost:8080/conteudos/com-questoes');  // Substitua pela URL correta da API
      if (!response.ok) {
        throw new Error('Erro ao buscar os conteúdos');
      }
  
      // Transformando o resultado da API para o formato esperado
      const conteudos = await response.json();
  
      // Mapeando os dados da API para o formato esperado pelo frontend, incluindo os subconteúdos completos
      const conteudosMapeados: Conteudo[] = conteudos.map((c: any) => ({
        id: c.id,
        nome: c.titulo,  // Mapeando "titulo" para "nome"
        descricao: c.descricao || '',  // Se o conteúdo tiver uma descrição, insira aqui
        sub_topicos: c.subConteudos ? c.subConteudos.map((sub: any) => ({
          id: sub.id,
          nome: sub.titulo,
          descricao: sub.descricao || '',
          sub_topicos: sub.subConteudos ? sub.subConteudos.map((s: any) => s.id) : []
        })) : []
      }));
      console.log("conteudosMapeados", conteudosMapeados)
      return conteudosMapeados;
    } catch (error) {
      console.error(error);
      throw error;  // Repropaga o erro para o componente lidar com ele
    }
  }

  // Função para enviar os dados das questões atualizadas para a API
export async function atualizarPerguntas(perguntasAtualizadas: {
  idPergunta: number;
  ultimaRevisao: Date;
  respostaCorreta: boolean;
  dificuldade: number;
}[]): Promise<void> {
  try {
    const response = await fetch('http://localhost:8080/perguntas/atualizar', {
      method: 'PUT',  // Ou 'POST' dependendo da implementação da API
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(perguntasAtualizadas),
    });

    if (!response.ok) {
      throw new Error('Erro ao atualizar as perguntas');
    }

    console.log('Perguntas atualizadas com sucesso!');
  } catch (error) {
    console.error('Erro ao atualizar perguntas:', error);
    throw error;
  }
}
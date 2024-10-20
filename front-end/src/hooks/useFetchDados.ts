// src/hooks/useFetchDados.ts
import { useEffect, useState } from 'react';
import { buscarConteudos, buscarQuestoes } from '../service';
import { Conteudo, Questao } from '../types';

interface UseFetchDadosResult {
  questoes: Questao[];
  conteudos: Conteudo[];
  loading: boolean;
  error: Error | null;
}

export const useFetchDados = (): UseFetchDadosResult => {
  const [questoes, setQuestoes] = useState<Questao[]>([]);
  const [conteudos, setConteudos] = useState<Conteudo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchDados = async () => {
      try {
        // Realiza os fetch das questoes e conteudos em paralelo
        const [questoesObtidas, conteudosObtidos] = await Promise.all([
          buscarQuestoes(),
          buscarConteudos(),
        ]);

        // Converte as datas das questoes
        const questoesComDatasConvertidas = questoesObtidas.map(questao => ({
          ...questao,
          proximaRevisao: new Date(questao.proximaRevisao),
          ultimaRevisao: new Date(questao.ultimaRevisao),
        }));

        // Atualiza os estados com os dados obtidos
        setQuestoes(questoesComDatasConvertidas);
        setConteudos(conteudosObtidos);
        setLoading(false);
      } catch (err) {
        console.error('Erro ao buscar dados:', err);
        setError(err as Error);
        setLoading(false);
      }
    };

    fetchDados();
  }, []);

  return { questoes, conteudos, loading, error };
};

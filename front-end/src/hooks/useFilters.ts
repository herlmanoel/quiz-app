// src/hooks/useQuizFilters.ts
import { useState, useMemo, useEffect } from 'react';
import { Conteudo, Questao, Filtro } from '../types';

interface UseQuizFiltersProps {
  allQuestoes: Questao[];
  conteudos: Conteudo[];
  filtros: { [key: string]: (questoes: Questao[]) => Questao[] };
  filtroInicial?: Filtro;
}

interface UseQuizFiltersResult {
  conteudoSelecionado: number[];
  setConteudoSelecionado: React.Dispatch<React.SetStateAction<number[]>>;
  conteudoExpandido: number[];
  toggleExpand: (id: number) => void;
  toggleSelect: (conteudo: Conteudo) => void;
  filtroSelecionado: Filtro;
  setFiltroSelecionado: (filtro: Filtro) => void;
  questoesFiltradas: Questao[];
  questionCounts: { [key: number]: number };
}

export const useQuizFilters = ({
  allQuestoes,
  conteudos,
  filtros,
  filtroInicial = 'todas',
}: UseQuizFiltersProps): UseQuizFiltersResult => {
  const [conteudoSelecionado, setConteudoSelecionado] = useState<number[]>([]);
  const [conteudoExpandido, setConteudoExpandido] = useState<number[]>([]);
  const [filtroSelecionado, setFiltroSelecionado] = useState<Filtro>(filtroInicial);
  const [filtradasPorCategoria, setFiltradasPorCategoria] = useState<Questao[]>([]);

  // Função para verificar se um conteúdo está expandido
  const isExpanded = (id: number): boolean => conteudoExpandido.includes(id);

  // Expande ou colapsa o conteúdo
  const toggleExpand = (id: number) => {
    setConteudoExpandido(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  // Seleciona ou deseleciona o conteúdo (e seus subconteúdos)
  const toggleSelect = (conteudo: Conteudo) => {
    const selecionarFilhos = (conteudo: Conteudo): number[] => {
      return [
        conteudo.id,
        ...conteudo.sub_topicos.flatMap(sub => selecionarFilhos(sub)),
      ];
    };

    const idsParaSelecionar = selecionarFilhos(conteudo);
    const isSelecionado = idsParaSelecionar.every(id => conteudoSelecionado.includes(id));

    if (isSelecionado) {
      setConteudoSelecionado(prev => prev.filter(id => !idsParaSelecionar.includes(id)));
    } else {
      setConteudoSelecionado(prev => [...new Set([...prev, ...idsParaSelecionar])]);
    }
  };

  const coletarTodosIds = (conteudo: Conteudo): number[] => {
    let ids = [conteudo.id];
    conteudo.sub_topicos.forEach(sub => {
      ids = ids.concat(coletarTodosIds(sub));
    });
    return ids;
  };

  const coletarSubTopicoIds = (conteudo: Conteudo): number[] => {
    return [
      ...conteudo.sub_topicos.map(sub => sub.id),
      ...conteudo.sub_topicos.flatMap(sub => coletarSubTopicoIds(sub)),
    ];
  };

  const identificarConteudosPrincipais = (conteudos: Conteudo[]): Conteudo[] => {
    const subTopicoIds = conteudos.flatMap(c => coletarSubTopicoIds(c));
    return conteudos.filter(c => !subTopicoIds.includes(c.id));
  };

  // Primeiro filtro: Aplicação do filtro de categoria
  useEffect(() => {
    const questoesFiltradas = filtros[filtroSelecionado](allQuestoes);
    setFiltradasPorCategoria(questoesFiltradas);
  }, [filtroSelecionado, allQuestoes, filtros]);

  // Segundo filtro: Aplicação do filtro por conteúdo
  const questoesFiltradas = useMemo(() => {
    if (conteudoSelecionado.length === 0) {
      return filtradasPorCategoria;
    } else {
      return filtradasPorCategoria.filter(item => conteudoSelecionado.includes(item.conteudo_id));
    }
  }, [conteudoSelecionado, filtradasPorCategoria]);

  const questionCounts = useMemo(() => {
    const counts: { [key: number]: number } = {};
    conteudos.forEach(conteudo => {
      const ids = coletarTodosIds(conteudo);
      counts[conteudo.id] = filtradasPorCategoria.filter(q => ids.includes(q.conteudo_id)).length;
    });
    return counts;
  }, [conteudos, filtradasPorCategoria]);

  return {
    conteudoSelecionado,
    setConteudoSelecionado,
    conteudoExpandido,
    toggleExpand,
    toggleSelect,
    filtroSelecionado,
    setFiltroSelecionado,
    questoesFiltradas,
    questionCounts,
  };
};

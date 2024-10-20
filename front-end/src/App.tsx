import { useEffect, useMemo, useState } from 'react';
import './App.css';
import { ConteudoList } from './components/ConteudosList';
import Filters from './components/Filtro';
import Header from './components/Header';
import { Quiz } from './components/Quiz';
import { Conteudo, Questao } from './types';
import { useFetchDados } from './hooks/useFetchDados';

export interface QuizProps {
  questoes: Questao[];
}

function App() {
  const { questoes: allQuestoes, conteudos, loading, error } = useFetchDados();

  const [conteudoSelecionado, setConteudoSelecionado] = useState<number[]>([]);
  const [conteudoExpandido, setConteudoExpandido] = useState<number[]>([]);
  const [quizIniciado, setQuizIniciado] = useState(false);
  const [filtradasPorCategoria, setFiltradasPorCategoria] = useState<Questao[]>([]);
  const [questoes, setQuestoes] = useState<Questao[]>([]);
  const [filtroSelecionado, setFiltroSelecionado] = useState<string>('todas');

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

  const questionCounts: { [key: number]: number } = useMemo(() => {
    const counts: { [key: number]: number } = {};
    conteudos.forEach(conteudo => {
      const ids = coletarTodosIds(conteudo);
      counts[conteudo.id] = filtradasPorCategoria.filter(q => ids.includes(q.conteudo_id)).length;
    });
    return counts;
  }, [conteudos, filtradasPorCategoria]);

  const identificarConteudosPrincipais = (conteudos: Conteudo[]): Conteudo[] => {
    const subTopicoIds = conteudos.flatMap(c => coletarSubTopicoIds(c));
    return conteudos.filter(c => !subTopicoIds.includes(c.id));
  };

  const coletarSubTopicoIds = (conteudo: Conteudo): number[] => {
    return [
      ...conteudo.sub_topicos.map(sub => sub.id),
      ...conteudo.sub_topicos.flatMap(sub => coletarSubTopicoIds(sub)),
    ];
  };

  const renderConteudosPrincipais = () => {
    const mainConteudos = identificarConteudosPrincipais(conteudos);
    return <ConteudoList
      conteudos={mainConteudos}
      questionCounts={questionCounts}
      isExpanded={isExpanded}
      toggleExpand={toggleExpand}
      isSelected={(id: number) => conteudoSelecionado.includes(id)}
      toggleSelect={toggleSelect}
    />;
  };

  const iniciarQuiz = () => {
    setQuizIniciado(true);
  };

  // Definição dos filtros
  const filtros: { [key: string]: (questoes: Questao[]) => Questao[] } = {
    todas: (questoes: Questao[]) => questoes,
    novas: (questoes: Questao[]) => questoes.filter(questao => questao.numeroTentativas === 0),
    revisar: (questoes: Questao[]) => questoes.filter(questao => questao.proximaRevisao <= new Date()),
    erradas: (questoes: Questao[]) => questoes.filter(questao => questao.totalRespostasIncorretas > 0),
  };

  // Primeiro filtro: Aplicação do filtro de categoria
  useEffect(() => {
    if (!loading && !error) { // Assegura que os dados foram carregados sem erros
      const questoesFiltradas = filtros[filtroSelecionado](allQuestoes);
      setFiltradasPorCategoria(questoesFiltradas);
    }
  }, [filtroSelecionado, allQuestoes, loading, error]);

  // Segundo filtro: Aplicação do filtro por conteúdo
  useEffect(() => {
    if (!loading && !error) { // Assegura que os dados foram carregados sem erros
      if (conteudoSelecionado.length === 0) {
        setQuestoes(filtradasPorCategoria);
      } else {
        const questoesFiltradasPorConteudo = filtradasPorCategoria.filter(item => conteudoSelecionado.includes(item.conteudo_id));
        setQuestoes(questoesFiltradasPorConteudo);
      }
    }
  }, [conteudoSelecionado, filtradasPorCategoria, loading, error]);

  return (
    <div className="app-container">
      {loading ? (
        <p>Carregando dados...</p>
      ) : error ? (
        <p>Ocorreu um erro ao carregar os dados: {error.message}</p>
      ) : !quizIniciado ? (
        <>
          <Header />

          <Filters filtros={filtros} filtroSelecionado={filtroSelecionado} setFiltroSelecionado={setFiltroSelecionado} />

          <section className="conteudos-section">
            <ul className="conteudos-lista">{renderConteudosPrincipais()}</ul>
          </section>

          {conteudoSelecionado.length > 0 && (
            <button className="iniciar-quiz-btn" onClick={iniciarQuiz} style={{ padding: '15px 30px', fontSize: '16px', cursor: 'pointer' }}>
              Iniciar Questões
            </button>
          )}
        </>
      ) : (
        <section className="quiz-section">
          {questoes.length > 0 ? (
            <>
              <h2>Quiz</h2>
              <p>Total de Questões: {questoes.length}</p>
              <Quiz questoes={questoes} />
            </>
          ) : (
            <p>Não há perguntas para o conteúdo selecionado.</p>
          )}
        </section>
      )}
    </div>
  );
}

export default App;

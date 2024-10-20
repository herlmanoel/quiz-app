import { useState } from 'react';
import { QuizProps } from '../../App';
import { Relatorio } from '../Relatorio';

import {
  calcularPontuacao,
  irParaProxima,
  irParaAnterior,
  finalizarQuiz,
  handleResposta,
  calcularProgresso,
} from './service';

const ProgressBar = ({ progresso }: { progresso: number }) => (
  <div className="progress-bar">
    <div className="progress" style={{ width: `${progresso}%` }}></div>
  </div>
);

const NavegacaoBotoes = ({
  indiceQuestaoAtual,
  setIndiceQuestaoAtual,
  respostasUsuario,
  questoes,
  finalizarQuiz,
}: {
  indiceQuestaoAtual: number;
  setIndiceQuestaoAtual: React.Dispatch<React.SetStateAction<number>>;
  respostasUsuario: (number | undefined)[];
  questoes: QuizProps['questoes'];
  finalizarQuiz: () => void;
}) => (
  <div className="botoes-navegacao">
    <button
      onClick={() => irParaAnterior(indiceQuestaoAtual, setIndiceQuestaoAtual)}
      disabled={indiceQuestaoAtual === 0}
      className="navegacao-btn"
    >
      Anterior
    </button>
    {indiceQuestaoAtual < questoes.length - 1 ? (
      <button
        onClick={() => irParaProxima(indiceQuestaoAtual, setIndiceQuestaoAtual, questoes)}
        className="navegacao-btn"
        disabled={respostasUsuario[indiceQuestaoAtual] === undefined}
      >
        Próximo
      </button>
    ) : (
      <button
        onClick={() => finalizarQuiz()}
        className="navegacao-btn finalizar"
        disabled={respostasUsuario[indiceQuestaoAtual] === undefined}
      >
        Finalizar Quiz
      </button>
    )}
  </div>
);

const AlternativasLista = ({
  alternativas,
  indiceQuestaoAtual,
  respostasUsuario,
  setRespostasUsuario,
}: {
  alternativas: { texto: string }[];
  indiceQuestaoAtual: number;
  respostasUsuario: (number | undefined)[];
  setRespostasUsuario: React.Dispatch<React.SetStateAction<(number | undefined)[]>>;
}) => (
  <ul className="alternativas-lista">
    {alternativas.map((alternativa, index) => (
      <li key={index}>
        <button
          onClick={() => handleResposta(index, respostasUsuario, setRespostasUsuario, indiceQuestaoAtual)}
          className={`alternativa-btn ${respostasUsuario[indiceQuestaoAtual] === index ? 'selecionado' : ''}`}
        >
          {/* Concatenar a letra correspondente */}
          {`${String.fromCharCode(65 + index)}) ${alternativa.texto}`}
        </button>
      </li>
    ))}
  </ul>
);


export const Quiz: React.FC<QuizProps> = ({ questoes }) => {
  const [indiceQuestaoAtual, setIndiceQuestaoAtual] = useState(0);
  const [respostasUsuario, setRespostasUsuario] = useState<(number | undefined)[]>(Array(questoes.length).fill(undefined));
  const [quizFinalizado, setQuizFinalizado] = useState(false);

  const questaoAtual = questoes[indiceQuestaoAtual];
  const progresso = calcularProgresso(respostasUsuario, questoes);

  if (quizFinalizado) {
    const pontuacao = calcularPontuacao(respostasUsuario, questoes) ?? 0;
    return <Relatorio pontuacao={pontuacao} questoes={questoes} respostasUsuario={respostasUsuario} />;
  }

  return (
    <div className="quiz-container">
      <h2>
        Questão {indiceQuestaoAtual + 1} de {questoes.length} | {progresso}% assinaladas
      </h2>
      <ProgressBar progresso={progresso} />
      <p className="pergunta">{questaoAtual.pergunta}</p>
      <AlternativasLista
        alternativas={questaoAtual.alternativas}
        indiceQuestaoAtual={indiceQuestaoAtual}
        respostasUsuario={respostasUsuario}
        setRespostasUsuario={setRespostasUsuario}
      />
      <NavegacaoBotoes
        indiceQuestaoAtual={indiceQuestaoAtual}
        setIndiceQuestaoAtual={setIndiceQuestaoAtual}
        respostasUsuario={respostasUsuario}
        questoes={questoes}
        finalizarQuiz={() => finalizarQuiz(setQuizFinalizado)}
      />
    </div>
  );
};

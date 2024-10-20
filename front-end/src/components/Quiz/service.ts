export const calcularPontuacao = (
    respostasUsuario: (number | undefined)[],
    questoes: {
      alternativas: { texto: string; correta: boolean }[];
    }[]
  ): number | undefined => {
    return respostasUsuario.reduce((pontuacao, resposta, index) => {
      const questao = questoes[index];
      if (typeof resposta === 'number' && questao.alternativas[resposta]?.correta && pontuacao !== undefined) {
        return pontuacao + 1;
      }
      return pontuacao;
    }, 0);
  };
  
  
  // Função para avançar para a próxima questão
  export const irParaProxima = (
    indiceQuestaoAtual: number,
    setIndiceQuestaoAtual: React.Dispatch<React.SetStateAction<number>>,
    questoes: { alternativas: { texto: string; correta: boolean }[] }[]
  ) => {
    if (indiceQuestaoAtual < questoes.length - 1) {
      setIndiceQuestaoAtual(indiceQuestaoAtual + 1);
    }
  };
  
  // Função para voltar à questão anterior
  export const irParaAnterior = (
    indiceQuestaoAtual: number,
    setIndiceQuestaoAtual: React.Dispatch<React.SetStateAction<number>>
  ) => {
    if (indiceQuestaoAtual > 0) {
      setIndiceQuestaoAtual(indiceQuestaoAtual - 1);
    }
  };
  
  // Função para finalizar o quiz
  export const finalizarQuiz = (
    setQuizFinalizado: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setQuizFinalizado(true);
  };
  
  // Função para lidar com a seleção da resposta do usuário
  export const handleResposta = (
    indiceAlternativa: number,
    respostasUsuario: (number | undefined)[],
    setRespostasUsuario: React.Dispatch<
      React.SetStateAction<(number | undefined)[]>
    >,
    indiceQuestaoAtual: number
  ) => {
    const novasRespostas = [...respostasUsuario];
    novasRespostas[indiceQuestaoAtual] = indiceAlternativa;
    setRespostasUsuario(novasRespostas);
  };
  
  // Função para calcular o progresso do quiz
  export const calcularProgresso = (
    respostasUsuario: (number | undefined)[],
    questoes: any[]
  ): number => {
    const quantidadeRespondidas = respostasUsuario.filter(
      (resposta) => resposta !== undefined
    ).length;
    return (quantidadeRespondidas / questoes.length) * 100;
  };
  
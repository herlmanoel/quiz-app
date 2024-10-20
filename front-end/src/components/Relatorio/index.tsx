import React, { useEffect } from 'react';
import { atualizarPerguntas } from '../../service'; // Função para atualizar as perguntas no backend

export const Relatorio: React.FC<{ pontuacao: number; questoes: any[]; respostasUsuario: (number | undefined)[] }> = ({ pontuacao, questoes, respostasUsuario }) => {

  // Função para preparar e enviar as questões atualizadas ao backend
  const prepararAtualizacao = () => {
    const perguntasAtualizadas = questoes.map((questao, index) => {
      const respostaUsuarioIndice = respostasUsuario[index];
      const respostaCorreta = questao.alternativas.find((alt: any) => alt.correta)?.correta;

      return {
        idPergunta: questao.id,
        ultimaRevisao: new Date(),
        respostaCorreta: respostaUsuarioIndice !== undefined ? questao.alternativas[respostaUsuarioIndice].correta : false,
        dificuldade: respostaUsuarioIndice !== undefined ? questao.ultimaDificuldade : 0, // Ajuste de acordo com sua lógica de dificuldade
      };
    });

    atualizarPerguntas(perguntasAtualizadas)
      .then(() => console.log("Atualização enviada com sucesso!"))
      .catch(err => console.error("Erro ao enviar atualização: ", err));
  };

  // Chama a função de atualização ao renderizar o relatório
  useEffect(() => {
    prepararAtualizacao();
  }, []); // Só roda uma vez, quando o relatório é renderizado

  return (
    <div className="quiz-finalizado">
      <h2>Quiz Finalizado!</h2>
      <p>Você acertou <strong>{pontuacao}</strong> de <strong>{questoes.length}</strong> questões.</p>
      <h3>Relatório Detalhado:</h3>
      <div className="tabela-container">
        <table className="resultado-tabela">
          <thead>
            <tr>
              <th>#</th>
              <th>Pergunta</th>
              <th>Resposta Correta</th>
              <th>Sua Resposta</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {questoes.map((questao, index) => {
              const respostaUsuarioIndice = respostasUsuario[index];
              const respostaUsuarioTexto = respostaUsuarioIndice !== undefined
                ? questao.alternativas[respostaUsuarioIndice].texto
                : 'Não Respondida';
              const respostaCorreta = questao.alternativas.find((alt: any) => alt.correta)?.texto;
              const estaCorreta = respostaUsuarioIndice !== undefined && questao.alternativas[respostaUsuarioIndice].correta;

              return (
                <tr key={questao.id}>
                  <td>{index + 1}</td>
                  <td>{questao.pergunta}</td>
                  <td>{respostaCorreta}</td>
                  <td>{respostaUsuarioTexto}</td>
                  <td className={estaCorreta ? 'status-correto' : 'status-incorreto'}>
                    {estaCorreta ? 'Correta' : 'Incorreta'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <button className="btn-reiniciar" onClick={() => window.location.reload()}>
        Reiniciar Quiz
      </button>
    </div>
  );
};

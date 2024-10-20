// src/components/ConteudoList.tsx
import React from 'react';
import { Conteudo, Questao } from '../../types';
import { ToggleBlock } from '../ToggleBlock';

interface ConteudoListProps {
  conteudos: Conteudo[];
  questionCounts: { [key: number]: number };
  isExpanded: (id: number) => boolean;
  toggleExpand: (id: number) => void;
  isSelected: (id: number) => boolean;
  toggleSelect: (conteudo: Conteudo) => void;
}

export const ConteudoList: React.FC<ConteudoListProps> = ({
  conteudos,
  questionCounts,
  isExpanded,
  toggleExpand,
  isSelected,
  toggleSelect,
}) => {
  return (
    <ul className="conteudos-lista">
      {conteudos.map(conteudo => {
        const quantidadeQuestoes = questionCounts[conteudo.id] || 0;
        const tituloComQuantidade = `${conteudo.nome} (${quantidadeQuestoes})`;

        return (
          <li key={conteudo.id}>
            <ToggleBlock
              title={tituloComQuantidade}
              isOpen={isExpanded(conteudo.id)}
              isSelected={isSelected(conteudo.id)}
              onIconClick={() => toggleExpand(conteudo.id)}
              onTitleClick={() => toggleSelect(conteudo)}
            >
              <p>{conteudo.descricao}</p>
              {conteudo.sub_topicos.length > 0 && (
                <ConteudoList
                  conteudos={conteudo.sub_topicos}
                  questionCounts={questionCounts}
                  isExpanded={isExpanded}
                  toggleExpand={toggleExpand}
                  isSelected={isSelected}
                  toggleSelect={toggleSelect}
                />
              )}
            </ToggleBlock>
          </li>
        );
      })}
    </ul>
  );
};

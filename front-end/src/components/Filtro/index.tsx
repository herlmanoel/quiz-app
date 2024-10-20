// src/components/Filters.tsx
import React from 'react';
import { Questao, Filtro } from '../../types';

interface FiltersProps {
  filtros: { [key: string]: (questoes: Questao[]) => Questao[] };
  filtroSelecionado: Filtro;
  setFiltroSelecionado: (filtro: string) => void;
}

const Filters: React.FC<FiltersProps> = ({ filtros, filtroSelecionado, setFiltroSelecionado }) => (
  <div className="filtros-section">
    <h3>Filtros</h3>
    <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
      {Object.keys(filtros).map(filtro => (
        <button
          key={filtro}
          style={{
            backgroundColor: filtroSelecionado === filtro ? '#007bff' : '#ccc',
            color: '#fff',
            padding: '10px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
          onClick={() => setFiltroSelecionado(filtro)}
        >
          {filtro.charAt(0).toUpperCase() + filtro.slice(1)}
        </button>
      ))}
    </div>
  </div>
);

export default Filters;

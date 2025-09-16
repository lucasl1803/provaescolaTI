import { useState } from 'react';
import { api } from '../api/api';

export default function ComodoForm({ fetchComodos, imovelId, initialData }) {
  const [nome, setNome] = useState(initialData?.nome || '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (initialData) {
      await api.put(`/imoveis/${imovelId}/comodos/${initialData._id}`, { nome });
    } else {
      await api.post(`/imoveis/${imovelId}/comodos`, { nome });
    }
    fetchComodos();
    setNome('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Nome do Cômodo" value={nome} onChange={e => setNome(e.target.value)} />
      <button type="submit">{initialData ? 'Atualizar' : 'Adicionar'}</button>
      </form>
    );
  }
import { useState } from 'react';
import { api } from '../api/api';

export default function ImovelForm({ fetchImoveis, initialData }) {
  const [descricao, setDescricao] = useState(initialData?.descricao || '');
  const [endereco, setEndereco] = useState(initialData?.endereco || '');
  const [dataCompra, setDataCompra] = useState(initialData?.dataCompra || '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (initialData) {
      await api.put(`/imoveis/${initialData._id}`, { descricao, endereco, dataCompra });
    } else {
      await api.post('/imoveis', { descricao, endereco, dataCompra });
    }
    fetchImoveis();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Descrição" value={descricao} onChange={e => setDescricao(e.target.value)} />
      <input placeholder="Endereço" value={endereco} onChange={e => setEndereco(e.target.value)} />
      <input type="date" value={dataCompra} onChange={e => setDataCompra(e.target.value)} />
      <button type="submit">{initialData ? 'Atualizar' : 'Adicionar'}</button>
    </form>
  );
}

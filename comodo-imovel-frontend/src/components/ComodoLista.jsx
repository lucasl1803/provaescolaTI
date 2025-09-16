import { useEffect, useState } from 'react';
import { api } from '../api/api';
import ComodoForm from './ComodoForm';

export default function ComodoList({ imovel }) {
  const [comodos, setComodos] = useState([]);
  const [editData, setEditData] = useState(null);

  const fetchComodos = async () => {
    const res = await api.get(`/imoveis/${imovel._id}/comodos`);
    setComodos(res.data);
  };

  const handleDelete = async (id) => {
    await api.delete(`/imoveis/${imovel._id}/comodos/${id}`);
    fetchComodos();
  };

  useEffect(() => { fetchComodos(); }, []);

  return (
    <div>
      <h3>Cômodos do {imovel.descricao}</h3>
      <ComodoForm fetchComodos={fetchComodos} imovelId={imovel._id} initialData={editData} />
      <ul>
        {comodos.map(comodo => (
          <li key={comodo._id}>
            {comodo.nome}
            <button onClick={() => setEditData(comodo)}>Editar</button>
            <button onClick={() => handleDelete(comodo._id)}>Deletar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

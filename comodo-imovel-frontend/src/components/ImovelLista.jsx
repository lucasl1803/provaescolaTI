import { useEffect, useState } from 'react';
import { api } from '../api/api';
import ImovelForm from './ImovelForm';
import ComodoLista from './ComodoLista';

export default function ImovelLista() {
  const [imoveis, setImoveis] = useState([]);
  const [editData, setEditData] = useState(null);
  const [selectedImovel, setSelectedImovel] = useState(null);

  const fetchImoveis = async () => {
    const res = await api.get('/imoveis');
    setImoveis(res.data);
  };

  const handleDelete = async (id) => {
    await api.delete(`/imoveis/${id}`);
    fetchImoveis();
  };

  useEffect(() => { fetchImoveis(); }, []);

  return (
    <div>
      <h2>Imóveis</h2>
      <ImovelForm fetchImoveis={fetchImoveis} initialData={editData} />
      <ul>
        {imoveis.map(imovel => (
          <li key={imovel._id}>
            {imovel.descricao} - {imovel.endereco} 
            <button onClick={() => setEditData(imovel)}>Editar</button>
            <button onClick={() => handleDelete(imovel._id)}>Deletar</button>
            <button onClick={() => setSelectedImovel(imovel)}>Ver Cômodos</button>
          </li>
        ))}
      </ul>
      {selectedImovel && <ComodoLista imovel={selectedImovel} />}
    </div>
  );
}
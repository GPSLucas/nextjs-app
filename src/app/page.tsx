'use client';

import { useEffect, useState } from 'react';
import { getTarefas, createTarefa, deleteTarefa } from './services/tarefaService';

interface Tarefa {
  id: number;
  title: string;
  created_at: string;
}

export default function Home() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    fetchTarefas();
  }, []);

  const fetchTarefas = async () => {
    const data = await getTarefas();
    setTarefas(data);
  };

  const handleAdd = async () => {
    if (!title.trim()) return;
    await createTarefa(title);
    setTitle('');
    fetchTarefas();
  };

  const handleDelete = async (id: number) => {
    await deleteTarefa(id);
    fetchTarefas();
  };

  return (
    <main style={{ padding: 20 }}>
      <h1>Lista de Tarefas</h1>
      <input
        type="text"
        value={title}
        placeholder="Nova tarefa"
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={handleAdd}>Adicionar</button>

      <ul>
        {tarefas.map((tarefa) => (
          <li key={tarefa.id}>
            {tarefa.title} — {new Date(tarefa.created_at).toLocaleString()}
            <button onClick={() => handleDelete(tarefa.id)}>🗑️</button>
          </li>
        ))}
      </ul>
    </main>
  );
}

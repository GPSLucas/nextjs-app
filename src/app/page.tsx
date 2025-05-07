'use client';

import { useEffect, useState } from 'react';
import { getTarefas, createToDo, deleteTarefa } from "@/app/services/tarefaService";
import { TrashIcon } from '@heroicons/react/24/outline';

interface Tarefa {
  id: number;
  title: string;
  created_at: string;
}

export default function Home() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    getTarefas()
      .then((todos) => {
        setTarefas(todos.tarefas);
      })
      .catch((error) => {
        console.error("Erro ao buscar tarefas:", error);
      });
  }, []);

  const handleAddTask = async () => {
    if (!title.trim()) return;

    const newTask = await createToDo({ title: title });
    setTarefas((prevTarefas) => [...prevTarefas, newTask]);
    setTitle("");
    getTarefas().then((todos) => setTarefas(todos.tarefas));
  };

  const handleDeleteTask = async (id: number) => {
    try {
      await deleteTarefa(id);
      setTarefas((prevTarefas) => prevTarefas.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Erro ao deletar tarefa:", error);
    }
  };

  return (
    <div className="to-do-container">
      <h1 className="text-2xl font-bold mb-4">Minhas tarefas</h1>

      <div className="mb-4 w-1/2 flex gap-2">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Digite uma nova tarefa"
          className="border p-2 mr-2 rounded-[0.9vw] w-full"
        />
        <button
          onClick={handleAddTask}
          className="bg-cyan-500 text-white px-4 py-2 border border-blue-200 rounded-[0.9vw] cursor-pointer hover:bg-cyan-600 transition-colors duration-300"
        >
          Adicionar
        </button>
      </div>

      <ul className="flex flex-col gap-2 w-auto">
        {tarefas.map((task) => (
          <li
            key={task.id}
            className="flex justify-between gap-4 p-4 rounded shadow list-to-do"
          >
            <span>{task.title}</span>
            <button
              onClick={() => handleDeleteTask(task.id)}
              className="text-red-500 hover:text-red-700"
            >
              <TrashIcon className="h-6 w-6 cursor-pointer" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
const API_URL = "http://localhost:3000";

export async function getTarefas() {
  const res = await fetch(`${API_URL}/tarefas`, { cache: 'no-store' });
  return res.json();
}

export async function createToDo(data: { title: string }) {
  const res = await fetch(`${API_URL}/tarefas`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  return res.json();
}

export async function deleteTarefa(id: number) {
  const res = await fetch(`${API_URL}/tarefas/${id}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    throw new Error('Erro ao deletar a tarefa');
  }

  return res.json();
}
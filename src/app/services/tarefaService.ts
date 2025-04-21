import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export async function getTarefas() {
  const response = await api.get('/tarefas');
  return response.data;
}

export async function createTarefa(title: string) {
  const response = await api.post('/tarefas', { title });
  return response.data;
}

export async function deleteTarefa(id: number) {
  const response = await api.delete(`/tarefas/${id}`);
  return response.data;
}

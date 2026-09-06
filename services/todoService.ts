import { ApiTodo } from '@/types/api-todo';

const API_URL = 'https://dummyjson.com/todos';

export async function createTodo(todo: string): Promise<ApiTodo> {
  const response = await fetch(`${API_URL}/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      todo,
      completed: false,
      userId: 1,
    }),
  });

  if (!response.ok) {
    throw new Error('Gagal membuat todo');
  }

  return response.json();
}

export async function updateTodo(
  id: number,
  updates: Partial<Pick<ApiTodo, 'todo' | 'completed'>>
): Promise<ApiTodo> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updates),
  });

  if (!response.ok) {
    throw new Error('Gagal memperbarui todo');
  }

  return response.json();
}
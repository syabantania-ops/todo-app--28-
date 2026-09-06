import { ApiTodo } from '@/types/api-todo';
import { apiClient } from '@/services/api';
import { Todo } from '@/types/todo';

export async function getTasks(): Promise<Todo[]> {
  const data = await apiClient<{ todos: ApiTodo[] }>('/todos?limit=15');

  return data.todos.map((item) => ({
    id: item.id,
    title: item.todo,
    description: `Todo dari DummyJSON untuk user ${item.userId}.`,
    completed: item.completed,
    createdAt: new Date().toISOString().split('T')[0],
    userId: item.userId,
  }));
}

export async function getTaskById(
  id: number
): Promise<Todo | null> {
  const item = await apiClient<ApiTodo>(`/todos/${id}`);

  if (!item) {
    return null;
  }

  return {
    id: item.id,
    title: item.todo,
    description: `Todo dari DummyJSON untuk user ${item.userId}.`,
    completed: item.completed,
    createdAt: new Date().toISOString().split('T')[0],
    userId: item.userId,
  };
}
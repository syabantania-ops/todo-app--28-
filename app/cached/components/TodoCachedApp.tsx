'use client';

import React from 'react';

import { useLocalStorage } from '@/hooks/useLocalStorage';
import TodoForm from '@/app/components/TodoForm';
import { Todo } from '@/types/todo';

type TodoCachedAppProps = {
  initialTodos: Todo[];
};

export default function TodoCachedApp({
  initialTodos,
}: TodoCachedAppProps) {
  const [todos, setTodos] = useLocalStorage<Todo[]>(
    'TODO_LIST_CACHE',
    initialTodos
  );

  const handleAddTodo = (title: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      title,
      description: 'Tugas baru yang disimpan di local storage.',
      completed: false,
      createdAt: new Date().toISOString().split('T')[0],
    };

    setTodos((prev) => [newTodo, ...prev]);
  };

  const handleToggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  };

  const handleDeleteTodo = (id: number) => {
    setTodos((prev) =>
      prev.filter((todo) => todo.id !== id)
    );
  };

  const handleReset = () => {
    setTodos(initialTodos);
  };

  return (
    <div>
      {/* Form Tambah Todo */}
      <TodoForm onAddTodo={handleAddTodo} />

      {/* Status Cache */}
      <div className="flex items-center justify-between mb-4 text-xs">
        <span className="text-green-600">
          ● Cache aktif (Local Storage: TODO_LIST_CACHE)
        </span>

        <button
          type="button"
          onClick={handleReset}
          className="text-gray-500 hover:text-gray-700 hover:underline"
        >
          Reset ke Data Awal
        </button>
      </div>

      {/* Header Daftar Tugas */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-gray-800">
          Daftar Tugas
        </h2>

        <span className="px-3 py-1 rounded-full bg-gray-100 text-sm text-gray-500">
          {todos.length} item
        </span>
      </div>

      {/* Todo List */}
      <ul className="space-y-3">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={`flex items-center justify-between gap-4 p-4 rounded-xl border transition-colors ${
              todo.completed
                ? 'bg-green-50 border-green-200'
                : 'bg-white border-gray-300'
            }`}
          >
            {/* Kiri */}
            <div className="flex items-center gap-3 min-w-0">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggleTodo(todo.id)}
                className="w-5 h-5 shrink-0 accent-blue-500"
              />

              <span
                className={`text-base ${
                  todo.completed
                    ? 'line-through text-gray-400'
                    : 'text-gray-800'
                }`}
              >
                {todo.title}
              </span>
            </div>

            {/* Kanan */}
            <div className="flex items-center gap-2 shrink-0">
              <a
                href={`/task/${todo.id}`}
                className="px-3 py-1 rounded-md bg-blue-100 text-blue-600 text-xs font-medium hover:bg-blue-200"
              >
                Detail →
              </a>

              <button
                type="button"
                onClick={() => handleDeleteTodo(todo.id)}
                className="px-3 py-1 rounded-md bg-red-400 text-white text-xs font-medium hover:bg-red-500"
              >
                Hapus
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
import React from 'react';
import { getTodos } from '@/lib/todo';
import TodoCachedApp from './components/TodoCachedApp';

export default async function CachedPage() {
  const initialTodos = await getTodos();

  return (
    <main className="min-h-screen bg-white px-6 py-8">
      <div className="max-w-3xl mx-auto">
        <header className="mb-8 border-b border-gray-300 pb-4">
          <h1 className="text-4xl font-bold text-gray-800 text-center">
            Daftar Tugas (Todo List)
          </h1>
        </header>

        <TodoCachedApp initialTodos={initialTodos} />
      </div>
    </main>
  );
}
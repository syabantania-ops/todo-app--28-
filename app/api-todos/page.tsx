import React from 'react';
import { getTasks } from '@/lib/tasks';
import ApiTodoList from './components/ApiTodoList';

export default async function ApiTodosPage() {
  const todos = await getTasks();

  return (
    <main className="min-h-screen bg-white py-8">
      <div className="max-w-6xl mx-auto px-8">
        <header className="mb-8">
          <h1 className="text-5xl font-bold text-center text-[#102a43] mb-6">
            Daftar Tugas (Todo List)
          </h1>

          <div className="border-b-2 border-gray-300" />
        </header>

        <ApiTodoList todos={todos} />
      </div>
    </main>
  );
}
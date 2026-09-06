'use client';

import React from 'react';
import { Todo } from '@/types/todo';

type ApiTodoListProps = {
  todos: Todo[];
};

export default function ApiTodoList({
  todos,
}: ApiTodoListProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-[#17324d]">
          Daftar Tugas
        </h2>

        <span className="px-4 py-2 rounded-full bg-[#f1f1f1] text-[#667085] text-base">
          {todos.length} item
        </span>
      </div>

      <ul className="space-y-4">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={`p-5 rounded-2xl border-2 flex items-center justify-between gap-5 ${
              todo.completed
                ? 'bg-[#f0fbf5] border-[#c9ead8]'
                : 'bg-white border-[#c8cdd3]'
            }`}
          >
            <div className="flex items-center gap-5 min-w-0 flex-1">
              <input
                type="checkbox"
                checked={todo.completed}
                readOnly
                className="w-6 h-6 shrink-0 accent-[#2196f3]"
              />

              <span
                className={`text-xl ${
                  todo.completed
                    ? 'line-through text-[#b7bdc5]'
                    : 'text-[#17324d]'
                }`}
              >
                {todo.title}
              </span>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <span className="px-3 py-2 rounded-full bg-[#ead5ff] text-[#9655d4] text-sm font-semibold">
                ID: #{todo.id}
              </span>

              <span className="px-3 py-2 rounded-full bg-[#d5e9ff] text-[#2385d8] text-sm font-semibold">
                User: {todo.userId}
              </span>

              <span
                className={`px-3 py-2 rounded-full text-sm font-semibold ${
                  todo.completed
                    ? 'bg-[#d9f5e4] text-[#4fa56e]'
                    : 'bg-[#fff0c9] text-[#e2a62c]'
                }`}
              >
                {todo.completed ? 'Selesai' : 'Pending'}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
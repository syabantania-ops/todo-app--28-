import { NextResponse } from 'next/server';
import { getTasks } from '@/lib/tasks';

export async function GET() {
  try {
    const todos = await getTasks();

    return NextResponse.json(todos);
  } catch (error) {
    console.error('GET /api/todos error:', error);

    return NextResponse.json(
      { error: 'Gagal mengambil data todo' },
      { status: 500 }
    );
  }
}
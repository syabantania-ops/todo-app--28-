import { NextResponse } from 'next/server';
import { getTaskById } from '@/lib/tasks';

type RouteParams = {
  params: Promise<{ id: string }>;
};

export async function GET(
  request: Request,
  { params }: RouteParams
) {
  try {
    const { id } = await params;
    const todo = await getTaskById(Number(id));

    if (!todo) {
      return NextResponse.json(
        { error: 'Todo tidak ditemukan' },
        { status: 404 }
      );
    }

    return NextResponse.json(todo);
  } catch (error) {
    console.error('GET /api/todos/[id] error:', error);

    return NextResponse.json(
      { error: 'Gagal mengambil detail todo' },
      { status: 500 }
    );
  }
}
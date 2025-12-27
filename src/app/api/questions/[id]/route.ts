import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET /api/questions/:id - 特定の質問を取得
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const question = await prisma.question.findUnique({
      where: { id: parseInt(params.id) },
    });

    if (!question) {
      return NextResponse.json(
        { error: 'Question not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(question);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch question' },
      { status: 500 }
    );
  }
}

// PUT /api/questions/:id - 質問を更新
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { question, answer, category } = body;

    const updatedQuestion = await prisma.question.update({
      where: { id: parseInt(params.id) },
      data: {
        ...(question && { question }),
        ...(answer && { answer }),
        ...(category !== undefined && { category }),
      },
    });

    return NextResponse.json(updatedQuestion);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update question' },
      { status: 500 }
    );
  }
}

// DELETE /api/questions/:id - 質問を削除
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.question.delete({
      where: { id: parseInt(params.id) },
    });

    return NextResponse.json({ message: 'Question deleted successfully' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete question' },
      { status: 500 }
    );
  }
}

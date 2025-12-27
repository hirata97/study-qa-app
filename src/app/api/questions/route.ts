import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET /api/questions - すべての質問を取得
export async function GET() {
  try {
    const questions = await prisma.question.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(questions);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch questions' },
      { status: 500 }
    );
  }
}

// POST /api/questions - 新しい質問と回答を作成
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { question, answer, category } = body;

    if (!question || !answer) {
      return NextResponse.json(
        { error: 'Question and answer are required' },
        { status: 400 }
      );
    }

    const newQuestion = await prisma.question.create({
      data: {
        question,
        answer,
        category: category || null,
      },
    });

    return NextResponse.json(newQuestion, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create question' },
      { status: 500 }
    );
  }
}

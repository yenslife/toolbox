import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
) {
  const uniqueCode = request.url.split('/').pop();
  const BACKEND_INTERNAL_URL = process.env.BACKEND_INTERNAL_URL || 'http://backend.zeabur.internal:8080';
  const response = await fetch(`${BACKEND_INTERNAL_URL}/download/${uniqueCode}`);
  const blob = await response.blob();

  if (!response.ok) {
    return new NextResponse('向後端請求失敗', { status: response.status });
  }

  return new NextResponse(blob);
}

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const BACKEND_INTERNAL_URL = process.env.BACKEND_INTERNAL_URL || 'http://backend.zeabur.internal:8080';
    
    // 建立新的 FormData 來轉發
    const newFormData = new FormData();
    for (const [key, value] of formData.entries()) {
      newFormData.append(key, value);
    }

    const response = await fetch(`${BACKEND_INTERNAL_URL}/upload`, {
      method: 'POST',
      body: newFormData,
    });

    const data = await response.text();
    
    return new NextResponse(data, {
      status: response.status,
      headers: response.headers,
    });
  } catch (error) {
    console.error('上傳檔案時發生錯誤:', error);
    return new NextResponse('上傳失敗', { status: 500 });
  }
}

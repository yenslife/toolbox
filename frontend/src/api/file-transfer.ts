interface UploadResponse {
  unique_code: string;
  expire_at: string;
}

interface DownloadResponse {
  url: string;
  fileName: string;
}

export const fileTransferApi = {
  API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  // 上傳檔案
  uploadFile: async (file: File): Promise<UploadResponse> => {
    const formData = new FormData();
    formData.append('file', file); // 命名為 file

    const response = await fetch(`${fileTransferApi.API_BASE_URL}/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('上傳失敗');
    }

    return response.json();
  },

  // 下載檔案
  getDownloadFile: async (uniqueCode: string): Promise<Blob> => {
    const response = await fetch(`${fileTransferApi.API_BASE_URL}/download/${uniqueCode}`);
    
    if (!response.ok) {
      throw new Error('下載失敗');
    }

    return response.blob();
  }
}; 
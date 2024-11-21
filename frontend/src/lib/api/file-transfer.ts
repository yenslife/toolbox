interface UploadResponse {
  unique_code: string;
  expire_at: string;
}

export const fileTransferApi = {
  uploadFile: async (file: File): Promise<UploadResponse> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('上傳失敗');
    }

    return response.json();
  },

  getDownloadFile: async (uniqueCode: string): Promise<Blob> => {
    const response = await fetch(`/api/download/${uniqueCode}`);

    if (response.status === 404) {
      throw new Error('找不到檔案');
    }
    
    if (!response.ok) {
      throw new Error('下載失敗');
    }

    return response.blob();
  }
}; 
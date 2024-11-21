import { useState } from 'react';
import { fileTransferApi } from '@/lib/api/file-transfer';

export function useFileTransfer() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadCode, setUploadCode] = useState<string | null>(null);
  const [expireAt, setExpireAt] = useState<string | null>(null);
  const [downloadURL, setDownloadURL] = useState<string | null>(null);
  const [downloadError, setDownloadError] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const uploadFile = async (file: File) => {
    try {
      setIsUploading(true);
      setUploadError(null);
      const response = await fileTransferApi.uploadFile(file);
      setUploadCode(response.unique_code);
      setExpireAt(response.expire_at);
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : '上傳失敗');
    } finally {
      setIsUploading(false);
    }
  };

  const getDownloadFile = async (uniqueCode: string) => {
    try {
      setDownloadError(null);
      const response = await fileTransferApi.getDownloadFile(uniqueCode);
      setDownloadURL(URL.createObjectURL(response));
    } catch (err) {
      setDownloadError(err instanceof Error ? err.message : '取得下載連結失敗');
      throw err;
    }
  };

  return {
    isUploading,
    uploadCode,
    expireAt,
    uploadError,
    downloadError,
    downloadURL,
    uploadFile,
    getDownloadFile,
  };
} 
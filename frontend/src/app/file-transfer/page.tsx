"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/hooks/use-toast";
import { UploadIcon, DownloadIcon } from "@radix-ui/react-icons";
import { useFileTransfer } from '@/hooks/use-file-transfer';

export default function FileTransfer() {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const { isUploading, uploadCode, expireAt, uploadError, downloadError, downloadURL, uploadFile, getDownloadFile } = useFileTransfer();
  const [downloadCode, setDownloadCode] = useState("");

  // 處理文件選擇
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      console.log("File selected:", selectedFile);
    }
  };

  // 處理拖曳
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault(); // 當拖曳到上傳區域時，防止預設行為 (通常瀏覽器會打開檔案)
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault(); // 當拖曳到上傳區域時，防止預設行為 (通常瀏覽器會打開檔案)
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      console.log("File dropped:", droppedFile);
    }
  };

  const handleUpload = async () => {
    if (file) {
      await uploadFile(file);
    }
  };

  const handleGetDownloadFile = async (code: string) => {
    await getDownloadFile(code);
    if (downloadURL) {
      toast({
        title: "下載連結已準備就緒",
        description: "點擊下方按鈕開始下載檔案",
        action: (
          <ToastAction altText="下載檔案">
            <a href={downloadURL} download target="_blank" rel="noopener noreferrer" className="flex items-center">
              <DownloadIcon className="w-4 h-4 mr-2" />
              下載檔案
            </a>
          </ToastAction>
        ),
      });
    }
  };

  return (
    <>
      {/* 使用說明 */}
      <div className="flex flex-col gap-4 p-4">
        <p className="text-muted-foreground">
          使用說明：將檔案拖曳到上傳區域或點擊按鈕上傳，完成後取得下載代碼，分享代碼即可讓他人下載檔案。(有效時間：30 分鐘)
        </p>
        {/* 上傳區域 */}
        <Card
          className="flex items-center justify-center h-48 border-dashed border-2 border-gray-300"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <div className="text-center">
            <p className="text-lg font-semibold mb-2">拖曳檔案到此處上傳</p>
            <p className="text-gray-500 mb-4">或點擊以下按鈕選擇文件</p>
            <Button variant="outline" asChild>
              <label className="cursor-pointer">
                <UploadIcon className="w-4 h-4 mr-2" />
                選擇文件
                <input
                  type="file"
                  hidden
                  onChange={handleFileChange}
                />
              </label>
            </Button>
          </div>
        </Card>

        {/* 如果有文件，顯示文件資訊 */}
        {file && (
          <Card className="p-4 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <p className="text-primary font-semibold">已選擇文件：</p>
              <p className="text-muted-foreground">{file.name}</p>
            </div>
            <Button 
              onClick={handleUpload} 
              disabled={isUploading}
            >
              {isUploading ? '上傳中...' : '確認上傳'}
            </Button>
          </Card>
        )}

        {uploadError && (
          <p className="text-destructive">{uploadError}</p>
        )}

        {uploadCode && (
          <Card className="p-4">
            <p>您的下載代碼：{uploadCode}</p>
            {/* 解析 expireAt */}
            {expireAt && (
              <p>有效時間：{new Date(expireAt).toLocaleString()}</p>
            )}
          </Card>
        )}

        {/* 下載區域 */}
        <Card className="flex flex-col items-center justify-center h-48 gap-4 p-4">
          <p className="text-lg font-semibold">下載文件</p>
          <input
            type="text"
            placeholder="請輸入下載代碼"
            value={downloadCode}
            onChange={(e) => setDownloadCode(e.target.value)}
            className="border p-2 rounded-md"
          />
          <Button 
            variant="outline" 
            onClick={() => downloadCode && handleGetDownloadFile(downloadCode)}
            disabled={!downloadCode}
          >
            取得下載連結
          </Button>
        </Card>
        {downloadError && (
          <p className="text-destructive">{downloadError}</p>
        )}
      </div>
    </>
  );
}

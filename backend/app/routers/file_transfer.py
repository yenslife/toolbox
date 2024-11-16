import os
import asyncio
from datetime import datetime

from fastapi import APIRouter
from fastapi import UploadFile, File
from fastapi import HTTPException
from fastapi.responses import FileResponse
from contextlib import asynccontextmanager

from settings import UPLOAD_DIR, CHECK_INTERVAL_SECONDS, EXPIRE_MINUTES
from services.file_transfer_service import (
    save_file, 
    delete_files,
    file_storage
)

os.makedirs(UPLOAD_DIR, exist_ok=True)

async def delete_expired_files():
    """定期刪除過期檔案"""
    while True:
        print("Checking for expired files...")

        # 找出過期的檔案
        now = datetime.now()
        to_delete = [k for k, file_info in file_storage.items() if now > file_info["expire_at"]]
        print(f"Found {len(to_delete)} expired files")

        delete_files(to_delete)
        await asyncio.sleep(CHECK_INTERVAL_SECONDS) # 每分鐘檢查一次

# 定義生命週期
@asynccontextmanager
async def lifespan(_):
    # 表示開始
    print("File transfer service started")
    task = asyncio.create_task(delete_expired_files()) # 啟動背景檢查
    yield
    # 表示結束
    task.cancel()
    print("File transfer service shutdown")


router = APIRouter(
    lifespan=lifespan,
    tags=["File Transfer"],
)

@router.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    """
    上傳檔案
    :param file: 上傳的檔案
    :return: 檔案資訊
    """
    # 之後可以加入檔案大小限制的功能
    content = await file.read()
    original_filename = file.filename
    file_info = save_file(content, original_filename) # 儲存檔案
    return {"unique_code": file_info["unique_code"], 
            "expire_at": file_info["expire_at"].isoformat(),
            "original_filename": original_filename,
            "stored_filename": file_info["stored_filename"]}

@router.get("/download/{unique_code}")
async def download_file(unique_code: str):
    """下載檔案"""
    file_info = file_storage.get(unique_code)
    now = datetime.now()
    if not file_info:
        raise HTTPException(status_code=404, detail=f"File with code {unique_code} not found or expired")
    
    # 檢查是否過期
    if now > file_info["expire_at"]:
        raise HTTPException(status_code=404, detail=f"Code {unique_code} expired")
    
    return FileResponse(file_info["path"], filename=file_info["original_filename"])
    
import os
import random
import string
from datetime import timedelta, datetime

from settings import UPLOAD_DIR, EXPIRE_MINUTES

file_storage = {}

def generate_random_code(length: int = 6) -> str:
    """產生一組隨機碼"""
    return ''.join(random.choices(string.ascii_letters + string.digits, k=length))

def generate_filename(unique_code: str, now: datetime, filename: str) -> str:
    """
    產生唯一檔案名稱
    :param unique_code: 唯一碼 (通常是六位數)
    :param now: 時間
    :param filename: 檔案名稱
    """
    return f"{unique_code}-{now.isoformat()}-{filename}"

def save_file(content: bytes, original_filename: str):
    """
    將指定檔案儲存到檔案系統中
    :param content: 檔案內容
    :param original_filename: 原始檔案名稱
    :return: 檔案資訊
    """
    unique_code = generate_random_code()
    now = datetime.now()
    stored_filename = generate_filename(unique_code, now, original_filename) # 產生唯一檔案名稱
    file_path = os.path.join(UPLOAD_DIR, stored_filename)
    with open(file_path, "wb") as f:
        f.write(content)

    expire_at = now + timedelta(minutes=EXPIRE_MINUTES)
    file_storage[unique_code] = {
        "original_filename": original_filename,
        "stored_filename": stored_filename,
        "unique_code": unique_code,
        "expire_at": expire_at,
        "path": file_path,
    }

    return file_storage[unique_code]

def delete_files(files: list[str]):
    """刪除指定檔案"""

    # 刪除指定檔案
    for filename in files:
        try:
            os.remove(file_storage[filename]["path"])
            del file_storage[filename]
        except Exception as e:
            print(f"Error deleting file {file_storage[filename]['path']}: {e}")
    print(f"Deleted {len(files)} files")

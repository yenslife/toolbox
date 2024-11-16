import os
from dotenv import load_dotenv

load_dotenv()

# 檔案相關設定
UPLOAD_DIR = os.getenv("UPLOAD_DIR", "/tmp/uploads")
CHECK_INTERVAL_SECONDS = int(os.getenv("CHECK_INTERVAL_SECONDS", 1200))
EXPIRE_MINUTES = int(os.getenv("EXPIRE_MINUTES", 30))

# 確保上傳目錄存在
os.makedirs(UPLOAD_DIR, exist_ok=True)

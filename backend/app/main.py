from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers.file_transfer import router as file_transfer_router

app = FastAPI(
    title="線上工具箱，提供各種工具函數",
    description="提供各種工具函數，方便開發者使用",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(file_transfer_router)

@app.get("/")
async def root():
    return {"message": "Hello World"}
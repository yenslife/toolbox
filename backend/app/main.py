from fastapi import FastAPI

from routers.file_transfer import router as file_transfer_router

app = FastAPI(
    title="線上工具箱，提供各種工具函數",
    description="提供各種工具函數，方便開發者使用",
    version="1.0.0",
)

app.include_router(file_transfer_router)

@app.get("/")
async def root():
    return {"message": "Hello World"}
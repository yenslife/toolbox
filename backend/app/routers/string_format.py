from fastapi import APIRouter

router = APIRouter()

@router.get("/string-format")
async def string_format():
    return {"message": "Hello World"}
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import os

from app.api import admin, merchant
from app.database import engine, Base
from app.config import settings

# 创建数据库表
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="星火自媒体工作台",
    description="AI驱动的自媒体内容生成平台",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS 配置
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],  # 前端开发服务器
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 静态文件服务
if not os.path.exists(settings.UPLOAD_DIR):
    os.makedirs(settings.UPLOAD_DIR)

app.mount("/uploads", StaticFiles(directory=settings.UPLOAD_DIR), name="uploads")

# API 路由
app.include_router(admin.router, prefix="/api/admin", tags=["管理员"])
app.include_router(merchant.router, prefix="/api/merchant", tags=["商户"])

@app.get("/")
async def root():
    return {"message": "星火自媒体工作台 API", "version": "1.0.0"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

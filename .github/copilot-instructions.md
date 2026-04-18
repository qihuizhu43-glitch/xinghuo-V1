# 星火自媒体工作台 - 项目指南

## 项目概述
星火自媒体工作台是一个综合的媒体内容生成平台，包含超级管理员界面和商户工作界面。

## 技术栈
- **前端**：React 18 + TypeScript + Ant Design Pro + Vite
- **后端**：Python + FastAPI + SQLAlchemy + PostgreSQL
- **缓存**：Redis
- **异步任务**：Celery
- **部署**：Docker + Docker Compose

## 项目结构

```
星火自媒体工作台/
├── frontend/              # React前端应用
├── backend/               # Python后端服务
├── docker-compose.yml     # 容器编排配置
└── README.md             # 项目说明
```

## 快速开始

### 环境要求
- Node.js 16+
- Python 3.9+
- Docker (可选)

### 前端开发
```bash
cd frontend
npm install
npm run dev
```

### 后端开发
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python -m uvicorn main:app --reload
```

## 功能模块

### 一、超管界面
1. 商户管理 - 账号创建、编辑、启停用
2. 行业管理 - 行业配置、热点渠道管理
3. 广告合规词库 - 违禁词管理
4. 素材管理 - 音频上传与管理

### 二、商户界面
#### 配置页Tab
- 产品档案管理
- 资产库管理（数字人、场景、音频）
- 图片生成

#### 工作流程Tab
1. 热点抓取
2. 产品档案选择
3. 生成标题、脚本
4. 封面生成
5. 数字人口播脚本生成
6. 视频生成

## 开发规范

### 前端
- 使用 TypeScript 编写
- 遵循 Ant Design 设计规范
- 组件化开发
- 单文件组件结构

### 后端
- RESTful API 设计
- 异步任务使用 Celery
- 数据验证使用 Pydantic
- 配置管理使用环境变量

## API 文档
后端启动后，访问 http://localhost:8000/docs 查看 Swagger API 文档

## 数据库
使用 PostgreSQL 作为主数据库，Redis 作为缓存和任务队列。

## 部署
使用 Docker Compose 进行容器化部署：
```bash
docker-compose up -d
```

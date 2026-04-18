# 星火自媒体工作台

一个功能完整的AI驱动的自媒体内容生成平台，支持热点抓取、脚本生成、视频制作等功能。

## 🎯 核心功能

### 超级管理员
- 商户账号管理（创建、编辑、启停用）
- 行业信息配置与热点渠道管理
- 广告合规词库维护
- 平台素材管理

### 商户工作流
- **配置管理**
  - 产品档案管理
  - 资产库管理（数字人、场景、音频）
  - AI图片生成

- **内容生成工作流**
  - 热点抓取与总结
  - 产品档案选择
  - AI标题与脚本生成
  - 封面生成
  - 数字人口播视频脚本
  - 视频生成

## 🛠 技术架构

```
┌─────────────────┐         ┌──────────────────┐
│   React + TS    │         │  Python FastAPI  │
│  Ant Design Pro │◄────►   │   SQLAlchemy     │
└─────────────────┘         │  PostgreSQL      │
       前端                    后端
                              │
                    ┌─────────┼─────────┐
                    ▼         ▼         ▼
                  Redis    MongoDB   第三方API
                 (缓存)    (热点历史) (Seedance等)
```

## 📦 项目结构

```
星火自媒体工作台/
├── frontend/
│   ├── src/
│   │   ├── components/         # 可复用组件
│   │   ├── pages/             # 页面组件
│   │   │   ├── super-admin/   # 超管界面
│   │   │   └── merchant/      # 商户界面
│   │   ├── services/          # API服务
│   │   ├── stores/            # 状态管理
│   │   ├── styles/            # 全局样式
│   │   └── App.tsx
│   ├── package.json
│   └── vite.config.ts
│
├── backend/
│   ├── app/
│   │   ├── api/               # API路由
│   │   │   ├── admin/        # 超管接口
│   │   │   ├── merchant/     # 商户接口
│   │   │   ├── hotspot/      # 热点抓取
│   │   │   ├── product/      # 产品档案
│   │   │   └── video/        # 视频生成
│   │   ├── models/            # 数据模型
│   │   ├── schemas/           # 数据校验
│   │   ├── services/          # 业务逻辑
│   │   ├── tasks/             # Celery异步任务
│   │   ├── utils/             # 工具函数
│   │   └── main.py           # 应用入口
│   ├── requirements.txt
│   └── .env.example
│
├── docker-compose.yml
└── README.md
```

## 🚀 快速开始

### 前置要求
- Node.js 16+
- Python 3.9+
- PostgreSQL 13+
- Redis 6+

### 安装依赖

**前端**
```bash
cd frontend
npm install
```

**后端**
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### 环境配置

在 `backend` 目录创建 `.env` 文件：
```
DATABASE_URL=postgresql://user:password@localhost:5432/sparkle_media
REDIS_URL=redis://localhost:6379/0
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

### 启动应用

**开发模式 - 前端**
```bash
cd frontend
npm run dev
# 访问 http://localhost:5173
```

**开发模式 - 后端**
```bash
cd backend
uvicorn app.main:app --reload --port 8000
# API文档 http://localhost:8000/docs
```

**使用Docker Compose**
```bash
docker-compose up -d
```

## 📚 核心功能详解

### 1. 热点抓取
- 支持多平台热点聚合（微博、抖音、小红书等）
- 行业热点渠道配置
- 批量fetch与智能总结
- 输出: `热点-date-time.md`

### 2. 产品档案管理
- 多产品/场景管理
- 产品描述与标签系统
- 支持编辑和新增

### 3. 内容生成
- AI生成5-10个标题
- 生成对应脚本
- AI味消除功能
- 违禁词检测

### 4. 封面生成
- 基于标题和脚本
- 集成Seedance API
- 支持自定义调整

### 5. 数字人口播
- 基于热点、行业、产品信息
- 生成口播脚本
- 输出界面风格和场景配置

### 6. 资产库管理
- 数字人库（上传/删除图片）
- 场景库（上传/删除图片）
- 音频库（选择/上传）

### 7. 图片生成
- 文生图、图生图
- 图片库管理
- 支持放入数字人库或场景库

### 8. 视频生成
- 调用视频生成流程
- 输出完整视频

## 🔐 安全性

- JWT 令牌认证
- 基于角色的访问控制 (RBAC)
- 广告合规词库检测
- 请求速率限制

## 📝 数据库设计

主要表结构：
- `users` - 用户账号
- `merchants` - 商户信息
- `products` - 产品档案
- `hotspots` - 热点信息
- `assets` - 资产库
- `generated_content` - 生成的内容
- `videos` - 视频记录

## 🤝 开发规范

### 前端
- 使用 TypeScript
- 遵循 Ant Design 规范
- 组件模块化
- 使用 TailwindCSS 补充样式

### 后端
- RESTful API
- 使用 Pydantic 验证
- 环境变量配置
- 单元测试覆盖

## 📖 API端点示例

```
POST   /api/admin/merchants           # 创建商户
GET    /api/admin/merchants           # 获取商户列表
PUT    /api/admin/merchants/{id}      # 编辑商户
DELETE /api/admin/merchants/{id}      # 删除商户

GET    /api/merchant/hotspots         # 获取热点列表
POST   /api/merchant/products         # 创建产品
POST   /api/merchant/content/titles   # 生成标题
POST   /api/merchant/videos/generate  # 生成视频
```

## 🔄 下一步

- [ ] 配置数据库和Redis
- [ ] 完善前端页面设计
- [ ] 实现API端点
- [ ] 集成第三方API（Seedance等）
- [ ] 编写单元测试
- [ ] 部署准备

## 📞 支持

如有问题，请提交Issue或联系开发团队。

## 📄 许可证

MIT License

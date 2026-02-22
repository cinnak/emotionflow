# EmotionFlow

EmotionFlow 是一个轻量、隐私优先的情绪释放 Web 应用（静态前端 + Node.js 静态服务）。

## MVP 现状（可生产部署）

- 静态资源服务，支持 HTML/CSS/JS 与常见字体/图片类型
- 安全响应头（`nosniff`、`DENY`、`COOP`、`CORP` 等）
- 路径解析防护（拦截 `../`、非法编码、空字节请求）
- `/healthz` 健康检查接口（支持 `GET/HEAD`，适合容器与平台探针）
- 已移除页面调试浮层与调试日志注入逻辑

## 本地运行

```bash
npm run dev
# 默认监听 0.0.0.0:8080
```

可通过环境变量配置：

```bash
HOST=0.0.0.0 PORT=3000 npm start
```

## 测试

```bash
npm test
```

## 部署建议

- Node.js 18+
- 通过反向代理（Nginx / Cloudflare / Vercel）启用 HTTPS
- 平台健康检查指向 `/healthz`

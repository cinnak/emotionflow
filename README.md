# EmotionFlow

EmotionFlow 是一个轻量、隐私优先的情绪释放 Web 应用（静态前端 + Node.js 静态服务）。

## MVP 现状（可生产部署）

- 静态资源服务，支持 HTML/CSS/JS 与常见字体/图片类型
- 安全响应头（`nosniff`、`DENY`、`COOP`、`CORP` 等）
- 路径穿越防护（禁止 `../` 越权读取）
- `/healthz` 健康检查接口（适合容器与平台探针）
- 前端调试模式默认关闭，可通过 `localStorage` 显式开启

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

## 调试前端日志

默认情况下不输出调试浮层。如需开启：

```js
localStorage.setItem('emotionflow:debug', '1')
location.reload()
```

关闭：

```js
localStorage.removeItem('emotionflow:debug')
location.reload()
```

## 部署建议

- Node.js 18+
- 通过反向代理（Nginx / Cloudflare / Vercel）启用 HTTPS
- 平台健康检查指向 `/healthz`

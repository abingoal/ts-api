import * as bodyParser from "body-parser";
import * as compression from "compression";
import * as debug from "debug";
import * as express from "express";
import * as helmet from "helmet";
import * as morgan from "morgan";
import * as path from "path";
import middlewareA from "./middleware/middlewareA";
import router from "./routes";

const app = express();
const debugLog = debug("api:app");
app.all("*", (req, res, next) => {
  // 过滤掉网站图标和爬虫协议请求
  if (req.path === "/favicon.ico" || req.path === "/robots.txt") {
    return;
  }
  next();
});
// 加载自定义中间件
app.use(middlewareA);
app.use(morgan("combined")); // 打印请求
// 代理服务器下获取真实IP地址
morgan.token("remote-addr", (req: express.Request) => {
  return (req.headers["x-real-ip"] || req.headers["x-forwarded-for"] || req.connection.remoteAddress).toString();
});
app.use(helmet()); // 设置Http头
app.use(compression()); // 压缩response
app.use(bodyParser.json()); // 解析application/json
app.use(bodyParser.urlencoded({ extended: false })); // 解析application/x-www-form-urlencode
app.use(express.static(path.join(__dirname, "public"))); // 静态资源目录
app.use(router); // 加载路由
// 404错误处理
app.use((req, res, next) => {
  res.status(404).json({ code: 404 });
});
// 500以及其他错误处理
app.use((err, req, res, next) => {
  debugLog(err);
  res.status(err.status || 500).json({ code: 500, data: err });
});

export default app;

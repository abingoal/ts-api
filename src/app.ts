import * as bodyParser from "body-parser";
import * as compression from "compression";
import * as debug from "debug";
import * as express from "express";
import * as helmet from "helmet";
import * as morgan from "morgan";
import * as path from "path";
import router from "./routes/base";
/**
 * express Application
 *
 * @class App
 */
class App {
  // 定义app
  public app: express.Application = express();
  public debugLog = debug("api:app");
  constructor() {
    // 加载中间件
    this.middleware();
  }
  /**
   * 中间件
   *
   * @private
   * @memberof App
   */
  private middleware(): void {
    this.app.all("*", (req, res, next) => {
      // 过滤掉网站图标和爬虫协议请求
      if (req.path === "/favicon.ico" || req.path === "/robots.txt") {
        return;
      }
      next();
    });
    this.app.use(morgan("dev")); // 打印请求
    this.app.use(helmet()); // 设置Http头
    this.app.use(compression()); // 压缩response
    this.app.use(bodyParser.json()); // 解析application/json
    this.app.use(bodyParser.urlencoded({ extended: false })); // 解析application/x-www-form-urlencode
    this.app.use(express.static(path.join(__dirname, "public"))); // 静态资源目录
    this.app.use(router); // 加载路由
    // 404错误处理
    this.app.use((req, res, next) => {
      res.status(404).json({ code: 404 });
    });
    // 500以及其他错误处理
    this.app.use((err, req, res, next) => {
      this.debugLog(err);
      res.status(err.status || 500).json({ code: 500, data: err });
    });
  }
}

export default new App().app;

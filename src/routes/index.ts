import { Router } from "express";
import userRouter from "../routes/users";

/**
 * 基础路由
 *
 * @class BaseRouter
 */
class BaseRouter {
  public router: Router = Router();
  constructor() {
    this.init();
  }
  private init() {
    this.router.get("/", (req, res, next) => {
      res.json({ Hello: "World" });
    });
    this.router.use("/api/v1/users", userRouter);
  }
}

export default new BaseRouter().router;

import { Router } from "express";
import users from "../controller/users";

/**
 * 用户相关路由
 *
 * @class UserRouter
 */
class UserRouter {
  public router: Router = Router();
  constructor() {
    this.init();
  }
  private init() {
    this.router.get("/userinfo", users.userInfo);
  }
}

export default new UserRouter().router;

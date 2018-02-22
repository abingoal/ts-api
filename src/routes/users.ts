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
    this.router
      .post("/userinfo", users.userInfo)
      .get("/userlist", users.userList)
      .post("/updatesomething", users.updateSomething);
  }
}

export default new UserRouter().router;

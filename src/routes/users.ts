import { Router } from "express";
import users from "../controller/users";

/**
 * 用户相关路由
 *
 * @class UserRouter
 */
class UserRouter {
  router: Router = Router();
  constructor() {
    this.init();
  }
  private init() {
    this.router
      .get("/userinfo", users.userInfo)
      .get("/userlist", users.userList)
      .post("/adduser", users.addUser)
      .post("/updatefirstname", users.updateFirstName);
  }
}

export default new UserRouter().router;

import * as debug from "debug";
import { NextFunction, Request, Response } from "express";
import { IUserInfo } from "../interface/users";
import msgCode from "../libs/msgcode";
import tools from "../libs/tools";
import dbUsers from "../service/users";
const debugLog = debug("api:user:controller");

/**
 * 用户相关控制类
 *
 * @class Users
 */
class Users {
  /**
   * 获取用户信息
   *
   * @static
   * @param {Request} req 请求
   * @param {Response} res 响应
   * @memberof Users
   */
  public static async userInfo(req: Request, res: Response, next: NextFunction) {
    const userid: number = parseInt(req.query.userid || 0, 10);
    if (userid === 0) {
      res.json({ code: msgCode.parmasError });
      return;
    }
    await dbUsers
      .userInfo({
        userid
      })
      .then(data => {
        return res.json(tools.handleResult(data));
      })
      .catch(err => {
        next(err);
      });
  }
  /**
   * 获取用户列表
   *
   * @static
   * @param {Request} req 请求
   * @param {Response} res 响应
   * @param {NextFunction} next
   * @memberof Users
   */
  public static async userList(req: Request, res: Response, next: NextFunction) {
    await dbUsers
      .userList()
      .then(data => res.json(tools.handleResult(data)))
      .catch(err => {
        next(err);
      });
  }
  public static async updateSomething(req: Request, res: Response, next: NextFunction) {
    await dbUsers.updateSomething().then(data => res.json(tools.handleResult(data)));
  }
}

export default Users;

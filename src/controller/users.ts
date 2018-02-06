import { NextFunction, Request, Response } from "express";
import { IUserInfo } from "../interface/users";
import { MsgCode } from "../libs/msgcode";
import dbUsers from "../service/users";

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
  public static async userInfo(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    await dbUsers
      .userInfo()
      .then((data) => {
        res.json({ code: MsgCode.success, data });
      })
      .catch(next);
  }
}

export default Users;

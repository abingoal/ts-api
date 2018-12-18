import { NextFunction, Request, Response } from "express";
import msgCode from "../libs/msgcode";
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
  static async userInfo(req: Request, res: Response, next: NextFunction) {
    const { userid = 0 }: { userid: number } = req.query;

    if (isNaN(userid) || userid === 0) {
      res.json({ code: msgCode.parmasError });
      return;
    }
    await dbUsers
      .userInfo(userid)
      .then(data => {
        res.json(data);
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
  static async userList(req: Request, res: Response, next: NextFunction) {
    const { pageindex = 1, pagesize = 20 }: { pageindex: number; pagesize: number } = req.query;
    await dbUsers
      .userList(pageindex, pagesize)
      .then(result => {
        const [data, count] = result;
        res.json({ data, count });
      })
      .catch(err => {
        next(err);
      });
  }
  /**
   * 添加用户
   * @param req 请求
   * @param res 相应
   * @param next
   */
  static async addUser(req: Request, res: Response, next: NextFunction) {
    const { firstName, lastName, age }: { firstName: string; lastName: string; age: number } = req.body;
    if (!firstName || !lastName || !age) {
      res.json({ code: msgCode.parmasError });
      return;
    }
    const result = await dbUsers.addUser({
      firstName,
      lastName,
      age
    });
    res.json(result);
  }
  /**
   * 修改用户名字
   * @param req 请求
   * @param res 相应
   * @param next
   */
  static async updateFirstName(req: Request, res: Response, next: NextFunction) {
    const { firstName = "", id = 0 }: { firstName: string; id: number } = req.body;
    if (isNaN(id) || !id) {
      res.json({ code: msgCode.parmasError });
      return;
    }
    const result = await dbUsers.updateFirstName(firstName, id);
    res.json(result);
  }
}

export default Users;

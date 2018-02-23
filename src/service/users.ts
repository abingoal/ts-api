import * as debug from "debug";
import db from "../database/mysql";
import { IUserInfo } from "../interface/users";
const debugLog = debug("api:users:service");
/**
 * 用户信息 数据操作
 * 此为模拟数据
 * 实际项目中可使用mangoDB或者mysql
 *
 * @class Users
 */
class Users {
  /**
   * 获取用户信息
   *
   * @static
   * @template T 泛型
   * @param {{ userid: number }} parmas 参数
   * @returns
   * @memberof Users
   */
  public static async userInfo<T>(parmas: { userid: number }) {
    // 使用普通语句
    return await db
      .exec("select * from user where id=:userid", parmas)
      .then((data: IUserInfo[]) => data);
    // 使用存储过程
    // return await db.exec("call pro_api_userinfo(:userid)", parmas).then((data: IUserInfo) => data);
  }
  public static async userList<T>() {
    return await db.exec("select * from user limit 10").then((data: IUserInfo[]) => data);
  }
  public static async updateSomething() {
    return { code: 123 };
  }
}
export default Users;

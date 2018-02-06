import * as debug from "debug";
import db from "../database/mysql";
import { IUserInfo } from "../interface/users";
const debugLog = debug("api:users:db");
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
   * @template T
   * @returns
   * @memberof Users
   */
  public static async userInfo<T>() {
    return await db
      .exec("select * from user where id=:id", { id: 1 })
      .then((data: IUserInfo) => data);
  }
}
export default Users;

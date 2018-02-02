import { IUserInfo } from "../interface/users";

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
    const userInfo: IUserInfo = {
      username: "abing",
      nickname: "阿冰"
    };
    return userInfo;
  }
}
export default Users;

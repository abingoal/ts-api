import { getConnection, Repository } from "typeorm";
import { User } from "../entity/users";

/**
 * 用户信息 数据操作
 *
 * @class Users
 */
class Users {
  /**
   * 获取单个用户信息
   * @param id 用户id
   */
  static async userInfo(id: number) {
    const userModel = getConnection().getRepository(User);
    return await userModel.findOne({ id });
  }
  /**
   * 获取用户列表
   * @param pageindex 页码
   * @param pagesize 每页数据数量
   */
  static async userList(pageindex: number, pagesize: number) {
    const userModel = getConnection().getRepository(User);
    return await userModel
      .createQueryBuilder()
      .orderBy("id", "DESC")
      .skip((pageindex - 1) * pagesize)
      .take(pagesize)
      .getManyAndCount();
  }
  /**
   * 更新用户某项信息
   * @param firstName 更新的字段名
   * @param id 用户ID
   */
  static async updateFirstName(firstName: string, id: number) {
    const userModel = getConnection().getRepository(User);
    const userToUpdate = await userModel.findOne({ id });
    userToUpdate.firstName = firstName;
    return await userModel.save(userToUpdate);
  }
  /**
   * 添加一条新记录
   * @param params 参数
   */
  static async addUser(params: { firstName: string; lastName: string; age: number }) {
    const userModel = getConnection().getRepository(User);
    const addUser = new User();
    addUser.firstName = params.firstName;
    addUser.lastName = params.lastName;
    addUser.age = params.age;
    return await userModel.save(addUser);
  }
}
export default Users;

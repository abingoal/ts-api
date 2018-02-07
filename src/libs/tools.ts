import msgCode from "./msgcode";
/**
 * 工具类
 *
 * @class Tools
 */
class Tools {
  /**
   * 处理结果
   * 该函数根据实际需要自行处理
   *
   * @static
   * @param {(any[] | {})} data 数组或者对象数据
   * @memberof Tools
   */
  public static handleResult(data: any[] | {});
  public static handleResult(data): { code: msgCode; data?: any[] } {
    if (data) {
      if (Array.isArray(data)) {
        if (data.length > 0) {
          return { code: msgCode.success, data };
        }
        return { code: msgCode.successWithoutData };
      } else {
        if (Object.keys(data).length > 0) {
          if (data.code) {
            return { code: data.code };
          }
          return { code: msgCode.success, data };
        }
        return { code: msgCode.exception };
      }
    } else {
      return { code: msgCode.exception };
    }
  }
}

export default Tools;

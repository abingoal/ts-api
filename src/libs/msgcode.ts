export enum MsgCode {
  exception = -1, // 异常
  error = 0, // 错误
  success = 1, // 成功
  parmasError = 10001, // 参数错误
  successWithoutData = 10002 // 请求成功，无数据
}
export default MsgCode;

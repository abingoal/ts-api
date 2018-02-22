import * as debug from "debug";
import * as mysql from "mysql";
const mysqlConfig = require("../configs/dbconfig/mysqlconfig.json");
const debugLog = debug("api:mysql");

/**
 * 操作mysql数据库
 *
 * @class MySqlDB
 */
class MySqlDB {
  /**
   * 连接实例
   *
   * @type {mysql.Connection}
   * @memberof MySqlDB
   */
  public conn: mysql.Connection;
  /**
   * 连接配置
   *
   * @type {mysql.ConnectionConfig}
   * @memberof MySqlDB
   */
  public config: mysql.ConnectionConfig;
  /**
   * 连接池配置
   *
   * @type {mysql.PoolConfig}
   * @memberof MySqlDB
   */
  public poolConfig: mysql.PoolConfig;
  /**
   * 连接池连接实例
   *
   * @type {mysql.PoolConnection}
   * @memberof MySqlDB
   */
  public pool: mysql.Pool;
  public static instance: MySqlDB = null;
  constructor() {
    this.init();
  }
  public static getInstance() {
    if (this.instance === null) {
      this.instance = new MySqlDB();
    }
    return this.instance;
  }
  /**
   * 初始化连接
   *
   * @memberof MySqlDB
   */
  public init() {
    // 普通连接
    this.config = mysqlConfig.connConfig;
    // this.conn = mysql.createConnection(this.config);

    // 连接池连接,可共用普通连接的属性
    this.config = Object.assign(mysqlConfig.poolConfig, this.config);
    this.pool = mysql.createPool(this.config);

    mysql.createConnection(this.config).connect(err => {
      if (err) {
        debugLog(err.message);
      }
      debugLog("connection success");
    });
  }
  /**
   * 执行sql语句 由于项目中大部分都是以调用存储过程为主，因此不需要太复杂的数据库操作，如需更多功能
   * 请参考[mysql官方文档](https://github.com/mysqljs/mysql)
   *
   * @static
   * @param {string} sqlStr sql语句
   * @param {object} [params] 参数
   * @returns
   * @memberof MySqlDB
   */
  public static exec(sqlStr: string, params?: object) {
    return new Promise((resolve, reject) => {
      if (!sqlStr) {
        reject({ err: "没有可执行的语句" });
        return;
      }
      this.getInstance().pool.getConnection((err, conn) => {
        conn.config.queryFormat = function(query: string, values: any) {
          if (!values) {
            return query;
          }
          return query.replace(
            /\:(\w+)/g,
            function(txt, key) {
              if (values.hasOwnProperty(key)) {
                return this.escape(values[key]);
              }
              return txt;
            }.bind(this)
          );
        };
        conn.query(sqlStr, params, (error, results, fields) => {
          conn.release();
          if (error) {
            reject({ error: error.message });
            return;
          }
          resolve(results);
        });
      });
    });
  }
}
MySqlDB.getInstance();
export default MySqlDB;

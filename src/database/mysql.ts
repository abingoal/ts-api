import * as debug from "debug";
import * as mysql from "mysql";

const mysqlConfig = require("../configs/dbconfig/mysqlconfig.json");
const debugLog = debug("api:mysql");

interface INonQuery {
  /**
   * 字段数
   *
   * @type {number}
   * @memberof INonQuery
   */
  fieldCount: number;
  /**
   * 影响行数
   *
   * @type {number}
   * @memberof INonQuery
   */
  affectedRows: number;
  /**
   * 插入ID
   *
   * @type {number}
   * @memberof INonQuery
   */
  insertId: number;
  /**
   * 服务器状态
   *
   * @type {number}
   * @memberof INonQuery
   */
  serverStatus: number;
  /**
   * 警告数
   *
   * @type {number}
   * @memberof INonQuery
   */
  warningCount: number;
  /**
   * 消息
   *
   * @type {string}
   * @memberof INonQuery
   */
  message: string;
  /**
   * 协议
   *
   * @type {boolean}
   * @memberof INonQuery
   */
  protocol41: boolean;
  /**
   * 改变行数
   *
   * @type {number}
   * @memberof INonQuery
   */
  changedRows: number;
}

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
      debugLog(err ? err.message : "connection success");
    });
  }

  /**
   * 执行sql语句
   * 请参考[mysql官方文档](https://github.com/mysqljs/mysql)
   *
   * @static
   * @param {string} sqlStr sql语句
   * @param {object} [params] 参数
   * @returns
   * @memberof MySqlDB
   */
  private static query(sqlStr: string, params?: object) {
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
          const sqlQuery = query.replace(
            /\:(\w+)/g,
            function(txt, key) {
              if (values.hasOwnProperty(key)) {
                return this.escape(values[key]);
              }
              return txt;
            }.bind(this)
          );
          debugLog(sqlQuery); // 打印执行的语句
          return sqlQuery;
        };
        conn.query(sqlStr, params, (error, results, fields) => {
          conn.release();
          if (error) {
            reject({ error: error.message });
            return;
          }
          resolve(results);
          debugLog("%o", results);
        });
        conn.on("error", () => {
          MySqlDB.getInstance().init();
        });
      });
    });
  }
  /**
   *  执行存储过程
   * @param sqlStr 执行语句
   * @param params 参数
   */
  public static exec(sqlStr: string, params?: object) {
    return this.query(sqlStr, params).then((result: any) => {
      if (result.length > 0) {
        return result[0];
      }
    });
  }
  /**
   * 执行查询SQL语句
   *
   * @static
   * @param {string} sqlStr SQL语句
   * @param {object} [params] 参数
   * @returns
   * @memberof MySqlDB
   */
  public static excuteQuery(sqlStr: string, params?: object) {
    const lowerCaseSqlStr = sqlStr.toLocaleLowerCase();
    if (
      lowerCaseSqlStr.includes("insert") ||
      lowerCaseSqlStr.includes("update") ||
      lowerCaseSqlStr.includes("delete")
    ) {
      return this.excuteNonQuery(sqlStr, params);
    }
    return this.query(sqlStr, params);
  }
  /**
   * 执行非查询SQL语句
   * @param sqlStr 执行语句
   * @param params 参数
   */
  public static excuteNonQuery(sqlStr: string, params?: object) {
    if (sqlStr.toLocaleLowerCase().includes("select")) {
      return this.query(sqlStr, params);
    }
    return this.query(sqlStr, params).then((result: INonQuery) => result);
  }
}

MySqlDB.getInstance();
export default MySqlDB;

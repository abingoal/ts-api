## TypeScript API Template

使用 TypeScript 构建的 API 项目模板

基本框架已成型，可直接下载后使用。

数据库连接支持 MySQL 和 MongoDB。

因为项目需要，对数据库的使用基本以存储过程为主，因此 MySQL 的数据库操作模块较为简单，如有更多需要，请参考 [nodejs mysql 文档](https://github.com/mysqljs/mysql)

MongoDB 的数据操作暂未加入。

### 项目结构

```
.
├── README.md               // 说明文档
├── package-lock.json
├── package.json
├── src
│ ├── app.ts                // 初始化app
│ ├── bin
│ │ └── www.ts              // 入口文件
│ ├── configs               // 配置文件
│ │ └── dbconfig            // 数据库配置
│ │ └── mysqlconfig.json    // mysql
│ ├── controller            // 控制器
│ │ └── users.ts
│ ├── database              // 数据库操作
│ │ ├── mongodb.ts
│ │ └── mysql.ts
│ ├── interface             // 接口
│ │ └── users.ts
│ ├── libs                  // 一些实用类库
│ │ └── msgcode.ts
│ ├── routes                // 路由
│ │ ├── base.ts
│ │ └── users.ts
│ └── service               // 数据处理
│ └── users.ts
├── test                    // 单元测试
├── tsconfig.json           // typescript编译配置
└── tslint.json             // typescript代码质量检测配置
```

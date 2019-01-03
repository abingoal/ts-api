## TypeScript API Template

使用 TypeScript 构建的 API 项目模板

基本框架已成型，可直接下载后使用。

项目使用 TypeORM 框架，使用方法可参考[官方文档](http://typeorm.io/#/)。

(持续优化中...)

### 项目结构

```bash
.
├── dist // 构建后文件夹
└── src
    ├── bin // 主执行目录
    ├── configs // 配置文件
    │   ├── common // 通用
    │   └── dbconfig // 数据库
    ├── controller // 控制器
    ├── database // 数据库支持
    ├── entity  // TypeORM - 实体
    ├── interface // 接口
    ├── keys // 秘钥
    ├── libs // 类库
    ├── middleware // 中间件
    ├── migration // TypeORM - 数据迁移
    ├── routes // 路由器
    ├── service // 数据操作
    └── subscriber // TypeORM - 订阅者

521 directories
```

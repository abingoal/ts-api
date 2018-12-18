module.exports = {
  apps: [
    {
      name: "ts-api",
      script: "bin/www.js", // 执行脚本路径
      watch: true, // 监控文件变动重启
      instances: 4, // 启用4个实例，如果设置为0或者'max'，则根据CPU数量启动最大进程
      exec_mode: "cluster", // 使用集群方式
      env: {
        COMMON_VARIABLE: "true"
      },
      env_production: {
        NODE_ENV: "production"
      }
    }
  ]
};

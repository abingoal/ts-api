const fs = require("fs");
const path = require("path");
const chalk = require("chalk");

const needCopy = ["ecosystem.config.js", "package.json", "ormconfig.json"];

if (!fs.existsSync("dist")) {
  fs.mkdirSync("dist");
}

needCopy.map(n => {
  //--> dist/${n}`
  console.log(
    chalk.magenta("copy file ") + chalk.green.bold(`src/${n}`) + chalk.red(" --> ") + chalk.cyan.bold(`dist/${n}`)
  );
  fs.copyFileSync(path.resolve(n), path.resolve(`dist/${n}`));
});

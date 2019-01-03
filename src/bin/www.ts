import * as debug from "debug";
import * as fs from "fs";
import * as http from "http";
import * as https from "https";
import * as path from "path";
import * as typeorm from "typeorm";
import app from "../app";

import { protocol } from "../configs/common/settings.json";

const debugLog = debug("api:server");

function createHttpServer() {
  const httpPort = parseInt(process.env.HTTPPORT || "80", 10);
  const httpServer = http.createServer(app);
  httpServer
    .on("listening", () => {
      debugLog(`listening on port ${httpPort}`);
    })
    .on("error", err => {
      debugLog(err.message);
      process.exit(1);
    })
    .listen(httpPort);
}
function createHttpsServer() {
  const httpsPort = parseInt(process.env.HTTPSPORT || "443", 10);
  const certOptions = {
    key: fs.readFileSync(path.resolve("src/keys/server.key")),
    cert: fs.readFileSync(path.resolve("src/keys/server.crt"))
  };
  const httpsServer = https.createServer(certOptions, app);
  httpsServer
    .on("listening", () => {
      debugLog(`listening on port ${httpsPort}`);
    })
    .on("error", err => {
      debugLog(err.message);
      process.exit(1);
    })
    .listen(httpsPort);
}
(() => {
  typeorm
    .createConnection()
    .then(() => {
      debug("api:orm")(`connect to mysql orm success`);
    })
    .catch(err => {
      throw err;
    });
})();
const protocols = ["httpOnly", "httpsOnly", "all"];
if (protocol && protocols.includes(protocol)) {
  switch (protocol) {
    case "httpOnly":
      createHttpServer();
      break;
    case "httpsOnly":
      createHttpsServer();
      break;
    case "all":
    default:
      createHttpServer();
      createHttpsServer();
      break;
  }
}

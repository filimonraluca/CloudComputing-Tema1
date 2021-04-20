const express = require("express");
var path = require("path");

const config = require("./config");
const loaders = require("./loaders/index");

const Logger = require("./loaders/logger");

async function startServer() {
  const app = express();

  app.use(express.static(__dirname + "/"));
  app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname + "/map1.html"));
  });
  
  await loaders({ expressApp: app });

  app.listen(config.port, (err) => {
    if (err) {
      Logger.error(err);
      process.exit(1);
      return;
    }
    Logger.info(`🛡️  Server listening on port: ${config.port} 🛡️`);
  });
}

startServer();
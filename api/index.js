const http = require("http");

const { router } = require("./router");
const { routes } = require("./router");
const { PORT } = require("./config");

process.on("uncaughtException", function (err) {
  console.log("uncaughtException");
  console.error(err.stack);
  console.log(err);
});

const server = http.createServer(async (req, res) => {
  await router(req, res, routes);
});

server.listen(PORT, async () => {
  console.log("Api server is listening on port " + PORT);
});

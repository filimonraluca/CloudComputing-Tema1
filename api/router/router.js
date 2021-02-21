const helpers = require("../common/helpers");
const url = require("url");
const fs = require('fs');
const { metric } = require("../metrics/index.js")
module.exports = async (req, res, routes) => {
  var start_time = new Date().getTime()
  const path = url.parse(req.url, true).pathname;
  metric.increaseRequestsNumber();
  console.log("REQ NR: ", metric.metrics.api_requests)
  const found = routes.find((route) => {
    return route.path == path && route.method == req.method;
  });
  if (found) {
    const param = url.parse(req.url, true).query;
    let body = null;
    if (req.method === "POST") {
      body = await getPostData(req);
    }
    return found.handler(start_time, req, res, param, body);
  } else {
    return helpers.error(start_time, res, "Endpoint not found", 404);
  }
};

function getPostData(req) {
  return new Promise((resolve, reject) => {
    try {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });
      req.on("end", () => {
        resolve(JSON.parse(body));
      });
    } catch (e) {
      reject(e);
    }
  });
}

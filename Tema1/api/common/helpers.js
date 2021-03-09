const OK = 200;
const BAD_REQUEST = 400;
const {metric} = require("../metrics/index.js")

module.exports.error = (
  start_time,
  res,
  error = "An unknown error occurred",
  statusCode = BAD_REQUEST
) => {
  var finish_time=new Date().getTime()
  console.log("REQ TIME: ", finish_time-start_time)
  metric.increaseErrorRes();
  metric.addToTimePerRequest(finish_time-start_time);
  addHeaders(res);
  res.statusCode = statusCode;
  res.end(
    JSON.stringify(
      {
        status: "fail",
        error: error.toString(),
      },
      null,
      3
    )
  );
};

module.exports.success = (start_time,res, data = null, statusCode = OK) => {
  addHeaders(res);
  var finish_time=new Date().getTime()
  console.log("REQ TIME: ", finish_time-start_time)
  metric.increaseSuccesRes();
  metric.addToTimePerRequest(finish_time-start_time);
  res.statusCode = statusCode;
  res.end(
    JSON.stringify(
      {
        status: "success",
        data,
      },
      null,
      3
    )
  );
};

const addHeaders = (res) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "POST, GET, OPTIONS, PATCH, DELETE"
  );
  return res;
};

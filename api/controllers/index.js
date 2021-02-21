const Controller = require("./Controller")
const MetricsController = require("./MetricsController")

const controller = new Controller();
const metricsController = new MetricsController();

module.exports={
    controller,
    metricsController,
}
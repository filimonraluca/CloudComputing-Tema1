const helpers = require("./../common/helpers");
const {metric} = require("../metrics/index.js");

class MetricsController {
    constructor() { }
    getMetrics(start_time, req, res, param, body){
    try{
        const response = metric.getMetrics();
        return helpers.success(start_time, res, response);
    }
    catch (error){
        return helpers.error(start_time, res, error);
    }
    }
}

module.exports = MetricsController;
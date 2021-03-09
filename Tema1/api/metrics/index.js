const { strict } = require('assert');
const { json_file } = require("../config/index")
const fs = require('fs');
class Metrics {
    constructor() { 
        this.metrics={}
        this.json_file = json_file
    }
    increaseRequestsNumber(){
        try {

            const data = fs.readFileSync(this.json_file, 'utf8');
            this.metrics = JSON.parse(data);
            this.metrics.api_requests+=1;
            fs.writeFileSync(this.json_file, JSON.stringify(this.metrics));

        } catch (err) {
            console.log(`Error reading file from disk: ${err}`);
        }
    }
    increaseSuccesRes(){
        try {

            const data = fs.readFileSync(this.json_file, 'utf8');
            this.metrics = JSON.parse(data);
            this.metrics.succes_response+=1;
            fs.writeFileSync(this.json_file, JSON.stringify(this.metrics));

        } catch (err) {
            console.log(`Error reading file from disk: ${err}`);
        }
    }
    increaseErrorRes(){
        try {

            const data = fs.readFileSync(this.json_file, 'utf8');
            this.metrics = JSON.parse(data);
            this.metrics.error_response+=1;
            fs.writeFileSync(this.json_file, JSON.stringify(this.metrics));

        } catch (err) {
            console.log(`Error reading file from disk: ${err}`);
        }
    }

    increaseTwitterPosts(){
        try {

            const data = fs.readFileSync(this.json_file, 'utf8');
            this.metrics = JSON.parse(data);
            this.metrics.twitter_posts+=1;
            fs.writeFileSync(this.json_file, JSON.stringify(this.metrics));

        } catch (err) {
            console.log(`Error reading file from disk: ${err}`);
        }
    }

    addToTimePerRequest(time){
        try {

            const data = fs.readFileSync(this.json_file, 'utf8');
            this.metrics = JSON.parse(data);
            this.metrics.time_per_request+=time;
            this.metrics.time_per_request/=2;
            fs.writeFileSync(this.json_file, JSON.stringify(this.metrics));

        } catch (err) {
            console.log(`Error reading file from disk: ${err}`);
        }
    }
    getMetrics(){
        return this.metrics;
    }
}
const metric = new Metrics();
module.exports = {
    metric,
}
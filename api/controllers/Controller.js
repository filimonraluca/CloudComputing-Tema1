const helpers = require("./../common/helpers");
const fetch = require('node-fetch');
const { twitter_config, youtube_key, unsplash_client_id } = require("../config");
const twitter = require('twitter-lite');
const client = new twitter(twitter_config);
const {metric} = require("../metrics/index.js");
const CREATED = 201;
class Controller {
  constructor() { }
  async getYoutubeLink(start_time, req, res, param, body) {
    const url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=' + param.query + "&key=" + youtube_key;
    var req_info = {
      method: "GET",
      url: url
    }
    console.log(req_info)
    const response = await fetch(url)
      .then(res => res.json())
      .then(json => {
        console.log(json)
        return "https://www.youtube.com/watch?v=" + json.items[1].id.videoId
      })
      .catch((error) => console.log(error))
    return helpers.success(start_time, res, response);
  }
  catch(error) {
    return helpers.error(start_time, res, error);
  }
  async getUnsplashImage(start_time, req, res, param, body) {
    const url = "https://api.unsplash.com/photos/random?client_id=" + unsplash_client_id
    var req_info = {
      method: "GET",
      url: url
    }
    console.log(req_info)
    const response = await fetch(url)
      .then(res => res.json())
      .then(json => {
        console.log(json)
        return json.urls.raw
      })
      .catch((error) => error)
    return helpers.success(start_time, res, response);
  }
  catch(error) {
    return helpers.error(start_time, res, error);
  }

  postTweet(start_time, req, res, param, body) {
    const { youtube_link, unsplash_link } = body;
    const update_json = { status: youtube_link.concat(" ", unsplash_link) }
    var post_response = ""
    var req_info = {
      method: "POST",
      url: "https://api.twitter.com/1.1/statuses/update.json",
      update_json: update_json,
    }
    console.log(req_info)
    client.post('statuses/update', update_json).then(
      result => {
        console.log(result)
        post_response = 'Message : "' + result.text + '"';
        metric.increaseTwitterPosts();
        return helpers.success(start_time, res, post_response, CREATED);
      }).catch((error) => error)
  }
  catch(error) {
    return helpers.error(start_time, res, error);
  }
}

module.exports = Controller;
const helpers = require("./../common/helpers");
const fetch = require('node-fetch');
const { twitter_config } = require("../config");
const twitter = require('twitter-lite');
const client = new twitter(twitter_config);
const CREATED = 201;
class Controller {
  constructor() { }
  async getYoutubeLink(req, res, param) {
    const url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&q=' + param.query + "&key=AIzaSyAkjjo24NOztzp415FLiqla1Iac6CCOTKk"
    const response = await fetch(url)
      .then(res => res.json())
      .then(json => "https://www.youtube.com/watch?v=" + json.items[0].id.videoId)
      .catch((error) => console.log(error))
    return helpers.success(res, response);
  }
  catch(error) {
    return helpers.error(res, error);
  }
  async getUnsplashImage(req, res, param) {
    const response = await fetch("https://api.unsplash.com/photos/random?client_id=X0mIE4Qu7gOl8vxDEypalg1_jbFSszBoqPYa4yZxMMI")
      .then(res => res.json())
      .then(json => json.urls.raw)
      .catch((error) => error)
    return helpers.success(res, response);
  }
  catch(error) {
    return helpers.error(res, error);
  }

  postTweet(req, res, param, body) {
    const { youtube_link, unsplash_link } = body;
    var post_response = ""
    client.post('statuses/update', { status: youtube_link.concat(" ", unsplash_link) }).then(
      result => {
        post_response = 'Message : "' + result.text + '"';
        console.log(post_response)
        return helpers.success(res, post_response, CREATED);
      }).catch((error) => error)
  }
  catch(error) {
    return helpers.error(res, error);
  }
}

module.exports = Controller;
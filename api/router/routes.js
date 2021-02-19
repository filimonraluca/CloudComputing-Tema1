const { controller } = require("../controllers/index");

const routes = [
    {
      method: "GET",
      path: "/api/youtube",
      handler: controller.getYoutubeLink.bind(controller),
    },
    {
        method: "GET",
        path: "/api/image",
        handler: controller.getUnsplashImage.bind(controller),
      },
      {
        method: "POST",
        path: "/api/twitter",
        handler: controller.postTweet.bind(controller),
      },
];
module.exports = routes;
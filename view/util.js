var y = document.getElementById("search-youtube")
var post_data = {
  youtube_link: null,
  unsplash_link: null,
};
y.addEventListener("click", function () {
  query = document.getElementById("youtube").value
  url = "http://localhost:3001/api/youtube?query=" + query;
  var req_info ={
    method: "GET",
    body: null,
    url: url
  }
  console.log(req_info)
  fetch(url)
    .then((data) => {
      return data.json();
    })
    .then((res) => {
      console.log(res)
      data = res.data;
      post_data.youtube_link = data;
      document.getElementById("link-youtube").href=data;
      document.getElementById("link-youtube").innerHTML=data;
    })
    .catch((error) => {
      console.log(error);
    });
});

var u = document.getElementById("search-unsplash")
u.addEventListener("click", function () {
  url = "http://localhost:3001/api/image";
  var req_info ={
    method: "GET",
    body: null,
    url: url
  }
  console.log(req_info)
  fetch(url)
    .then((data) => {
      return data.json();
    })
    .then((res) => {
      console.log(res)
      data = res.data;
      post_data.unsplash_link = data
      document.getElementById("link-unsplash").href=data;
      document.getElementById("link-unsplash").innerHTML = data;
    })
    .catch((error) => {
      console.log(error);
    });
});

var post_button = document.getElementById("post")
post_button.addEventListener("click", function () {
  if (post_data.unsplash_link && post_data.youtube_link) {
    document.getElementById("error-message").innerHTML = ""
    postData(post_data)
  }
  else {
    document.getElementById("succes-message").innerHTML = ""
    document.getElementById("error-message").innerHTML = "Choose youtube link and unsplash link!";
  }
})
async function postData(data) {
  url = "http://localhost:3001/api/twitter";
  var req_info ={
    method: "POST",
    body: JSON.stringify(data),
    url: url
  }
  console.log(req_info)
  fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
  })
    .then((data) => {
      return data.json();
    })
    .then((res) => {
      console.log(res)
      data = res.data;
      document.getElementById("succes-message").innerHTML = "You successfully tweeted!"
      document.getElementById("post-response").innerHTML = data;
    })
    .catch((error) => {
      console.log(error);
    });
}

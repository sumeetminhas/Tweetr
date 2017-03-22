/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
 $(document).ready(function() {
var tweetData = [{
  "user": {
    "name": "Newton",
    "avatars": {
      "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
      "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
      "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
    },
    "handle": "@SirIsaac"
  },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
  },
  "created_at": 1461116232227
}];

function renderTweets(tweets) {
  for (let tweet in tweets){
    $(createTweetElement(tweets[tweet])).prependTo('#tweets');
  }
}

function escapeIt(str){
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function createTweetElement(tweet) {
  // let $article = $('<article class="tweet"></article>');
  //   $article.append(createHeader(tweet))
  //           .append(createBody(tweet))
  //           .append(createFooter(tweet))
  //   return $article;
  return $('<article>', {
    class: "tweet",
    html: [
      createHeader(tweet),
      createBody(tweet),
      createFooter(tweet)
    ]
  })
}

function createHeader(data) {
  var $header = $('<header></header>')
    $header.append($('<img class="avatar">'))
           .append($('<h3></h3>').text(data.user.name))
           .append($('<span class="user-handle"></span>').text(`@${data.user.handle}`));
    return $header;
}

function createBody(data) {
  var $body = $('<main></main>')
    $body.append($('<p></p>').text(data.content.text));
  return $body;
}

function createFooter(data) {
  var $footer = $('<footer></footer>')
    $footer.append($('<p></p>').text(data.created_at.number));
  return $footer;
}
//event handlers
  $('form').on('submit', function (e) {
    e.preventDefault();
  })

renderTweets(tweetData);

})
